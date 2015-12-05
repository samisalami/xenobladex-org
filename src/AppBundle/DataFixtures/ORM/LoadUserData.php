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


class LoadUserData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $userAdmin = new User();
        $userAdmin->setUsername('admin');
        $userAdmin->setPassword('test');
        $userAdmin->setEmail('test@samisalami.de');

        $manager->persist($userAdmin);
        $manager->flush();
    }
}