<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Collection
 *
 * @ORM\Table(name="xenobladex_collection")
 * @ORM\Entity
 */
class Collection
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
     * @ORM\Column(name="region", type="string", length=255)
     */
    private $region;

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
     * Set region
     *
     * @param string $region
     * @return Collection
     */
    public function setRegion($region)
    {
        $this->region = $region;

        return $this;
    }

    /**
     * Get region
     *
     * @return string 
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * Set rewardSp
     *
     * @param integer $rewardSp
     * @return Collection
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
     * @return Collection
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
