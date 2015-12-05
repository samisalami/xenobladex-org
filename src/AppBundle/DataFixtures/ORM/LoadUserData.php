<?php
/**
 * Created by PhpStorm.
 * User: Samjessa
 * Date: 04.12.2015
 * Time: 21:54
 */

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;


class LoadUserData implements FixtureInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        $um = $this->container->get('fos_user.user_manager');
        $userAdmin = $um->createUser();
        $userAdmin->setUsername('admin');
        $userAdmin->setPlainPassword('test');
        $userAdmin->setEmail('test@samisalami.de');
        $userAdmin->setEnabled(true);
        $um->updateUser($userAdmin,true);
    }
}