<?php

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
     * @param $message
     * @return Response
     */
    protected function returnFailureMessage($message) {
        $response = new Response(json_encode(array('success' => false,'message' => $message)));
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
     * @Route("/user/login", methods={"POST"})
     */
    public function loginAction(Request $request) {
        $content = $request->getContent();
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
                if($user->isEnabled()) {
                    if(!$this->checkUserPassword($user, $password)){
                        return $this->returnFailureMessage("Falsche Anmeldedaten.");
                    } else {
                        $this->loginUser($user);
                        return $this->returnSuccess();
                    }
                } else {
                    return $this->returnFailureMessage("Bitte warte auf deine Aktivierung.");
                }
            } else {
                return $this->returnFailureMessage("Falsche Anmeldedaten");
            }
        } else {
            return $this->returnFailureMessage("Bitte versuche es erneut.");
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

    /**
     * @Route("/user/register", methods={"POST"})
     */
    public function registerAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $data = json_decode($content);
            $username = $data->username;
            $email = $data->email;
            $password = $data->password;
            $password_repeat = $data->password_repeat;
            $form_message = $data->form_message;

            if(!empty($username)&&!empty($email)&&!empty($password)&&!empty($password_repeat)&&!empty($form_message)) {
                if($password === $password_repeat) {
                    $um = $this->getUserManager();
                    $existing_user_by_name = $um->findUserByUsername($username);
                    if(is_null($existing_user_by_name)) {
                        $existing_user_by_email = $um->findUserByEmail($email);
                        if(is_null($existing_user_by_email)) {
                            $user = $um->createUser();
                            $user->setUsername($username);
                            $user->setPlainPassword($password);
                            $user->setEmail($email);
                            $user->setEnabled(false);
                            $um->updateUser($user);

                            //send mail for activation
                            $message = \Swift_Message::newInstance()
                                ->setSubject("XenobladeX.org - Registrierung bestätigen")
                                ->setFrom("noreply@xenobladex.org")
                                ->setTo("kontakt@samisalami.de")
                                ->setBody("
                            Name: ".$username."
                            E-Mail: ".$email."
                            Nachricht:
                            ".$form_message."
                            ",
                                    "text/plain")
                            ;
                            $this->get("mailer")->send($message);

                            return $this->returnSuccess();
                        } else {
                            return $this->returnFailureMessage("Email bereits angemeldet.");
                        }
                    } else {
                        return $this->returnFailureMessage("Name bereits vergeben.");
                    }
                } else {
                    return $this->returnFailureMessage("Passwörter nicht identisch.");
                }
            } else {
                return $this->returnFailureMessage("Nicht alle Felder sind befüllt.");
            }
        }
    }
}