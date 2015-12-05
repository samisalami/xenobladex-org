<?php
/**
 * Created by PhpStorm.
 * User: Samjessa
 * Date: 04.12.2015
 * Time: 22:06
 */

namespace AppBundle\Controller\RestController;

use AppBundle\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authentication\Token\AnonymousToken;


class UserController extends FOSRestController
{
    /**
     * @return object
     */
    protected function getUserManager(){
        return $this->get('fos_user.user_manager');
    }

    /**
     * @return object
     */
    protected function getSecurity(){
        return $this->get('security.context');
    }

    /**
     * @param User $user
     */
    protected function loginUser(User $user){
        $security = $this->getSecurity();
        $providerKey = $this->container->getParameter('fos_user.firewall_name');
        $roles = $user->getRoles();
        $token = new UsernamePasswordToken($user, null, $providerKey, $roles);
        $security->setToken($token);
    }

    /**
     * @param User $user
     * @param $password
     * @return Boolean
     */
    protected function checkUserPassword(User $user, $password) {
        $factory = $this->get('security.encoder_factory');
        $encoder = $factory->getEncoder($user);
        if(!$encoder){
            return false;
        }
        return $encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt());
    }

    /**
     * @return Response
     */
    protected function returnFailure() {
        $response = new Response(json_encode(array('success' => false,'message' => "Wrong Data!")));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @return Response
     */
    protected function returnSuccess() {
        $response = new Response(json_encode(array('success' => true)));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/user/login", methods={"POST"})
     */
    public function loginAction() {
        $content = $this->get('request')->getContent();
        if(!empty($content)) {
            $data = json_decode($content);
            $username = $data->username;
            $password = $data->password;

            $um = $this->getUserManager();

            $user = $um->findUserByUsername($username);
            if(is_null($user)){
                $user = $um->findUserByEmail($username);
            }

            if(!is_null($user)){
                if(!$this->checkUserPassword($user, $password)){
                    return $this->returnFailure();
                } else {
                    $this->loginUser($user);
                    return $this->returnSuccess();
                }
            } else {
                return $this->returnFailure();
            }
        }
    }

    /**
     * @Route("/user/logout", methods={"GET"})
     */
    public function logoutAction() {
        $security = $this->getSecurity();
        $token = new AnonymousToken(null, new User());
        $security->setToken($token);
        $this->get('session')->invalidate();
        return $this->returnSuccess();
    }
}