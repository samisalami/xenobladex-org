<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\MaxDepth;

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
     * @ORM\ManyToOne(targetEntity="Collection")
     * @ORM\JoinColumn(name="collection_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collection'>")
     * @MaxDepth(1)
     */
    private $collection;

    /**
     * @ORM\ManyToOne(targetEntity="CollectionCategory")
     * @ORM\JoinColumn(name="collection_category_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:CollectionCategory'>")
     * @MaxDepth(1)
     */
    private $collectionCategory;


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

    /**
     * Set collection
     *
     * @param \AppBundle\Entity\Collection $collection
     * @return CollectionGroup
     */
    public function setCollection(\AppBundle\Entity\Collection $collection = null)
    {
        $this->collection = $collection;

        return $this;
    }

    /**
     * Get collection
     *
     * @return \AppBundle\Entity\Collection 
     */
    public function getCollection()
    {
        return $this->collection;
    }

    /**
     * Set collectionCategory
     *
     * @param \AppBundle\Entity\CollectionCategory $collectionCategory
     * @return CollectionGroup
     */
    public function setCollectionCategory(\AppBundle\Entity\CollectionCategory $collectionCategory = null)
    {
        $this->collectionCategory = $collectionCategory;

        return $this;
    }

    /**
     * Get collectionCategory
     *
     * @return \AppBundle\Entity\CollectionCategory 
     */
    public function getCollectionCategory()
    {
        return $this->collectionCategory;
    }
}
