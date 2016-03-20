<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CollectionGroup
 *
 * @ORM\Table(name="xenobladex_collection_group")
 * @ORM\Entity
 */
class CollectionGroup
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var integer
     *
     * @ORM\Column(name="reward_sp", type="smallint")
     */
    private $rewardSp = 0;

    /**
     * @var string
     *
     * @ORM\Column(name="reward_item", type="string", length=255)
     */
    private $rewardItem;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return CollectionGroup
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set rewardSp
     *
     * @param integer $rewardSp
     * @return CollectionGroup
     */
    public function setRewardSp($rewardSp)
    {
        $this->rewardSp = $rewardSp;

        return $this;
    }

    /**
     * Get rewardSp
     *
     * @return integer 
     */
    public function getRewardSp()
    {
        return $this->rewardSp;
    }

    /**
     * Set rewardItem
     *
     * @param string $rewardItem
     * @return CollectionGroup
     */
    public function setRewardItem($rewardItem)
    {
        $this->rewardItem = $rewardItem;

        return $this;
    }

    /**
     * Get rewardItem
     *
     * @return string 
     */
    public function getRewardItem()
    {
        return $this->rewardItem;
    }
}
