<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\VirtualProperty;
use JMS\Serializer\Annotation\SerializedName;

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
    private $rewardItem = "";

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
     * @ORM\OneToOne(targetEntity="Collectible")
     * @ORM\JoinColumn(name="collectible1_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collectible'>")
     * @MaxDepth(1)
     */
    private $collectible1;

    /**
     * @ORM\OneToOne(targetEntity="Collectible")
     * @ORM\JoinColumn(name="collectible2_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collectible'>")
     * @MaxDepth(1)
     */
    private $collectible2;

    /**
     * @ORM\OneToOne(targetEntity="Collectible")
     * @ORM\JoinColumn(name="collectible3_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collectible'>")
     * @MaxDepth(1)
     */
    private $collectible3;

    /**
     * @ORM\OneToOne(targetEntity="Collectible")
     * @ORM\JoinColumn(name="collectible4_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collectible'>")
     * @MaxDepth(1)
     */
    private $collectible4;

    /**
     * @ORM\OneToOne(targetEntity="Collectible")
     * @ORM\JoinColumn(name="collectible5_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collectible'>")
     * @MaxDepth(1)
     */
    private $collectible5;

    /**
     * @ORM\OneToOne(targetEntity="Collectible")
     * @ORM\JoinColumn(name="collectible6_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collectible'>")
     * @MaxDepth(1)
     */
    private $collectible6;

    /**
     * @ORM\OneToOne(targetEntity="Collectible")
     * @ORM\JoinColumn(name="collectible7_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collectible'>")
     * @MaxDepth(1)
     */
    private $collectible7;

    /**
     * @ORM\OneToOne(targetEntity="Collectible")
     * @ORM\JoinColumn(name="collectible8_id", referencedColumnName="id")
     * @Type("RelatedEntity<'AppBundle:Collectible'>")
     * @MaxDepth(1)
     */
    private $collectible8;


    /**
     * @VirtualProperty
     * @SerializedName("collection_category_prio")
     */
    public function getMonsterTypePrio() {
        if(!$this->getCollectionCategory()) {
            return null;
        }
        return $this->getCollectionCategory()->getPrio();
    }

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

    /**
     * Set collectible1
     *
     * @param \AppBundle\Entity\Collectible $collectible1
     * @return CollectionGroup
     */
    public function setCollectible1(\AppBundle\Entity\Collectible $collectible1 = null)
    {
        $this->collectible1 = $collectible1;

        return $this;
    }

    /**
     * Get collectible1
     *
     * @return \AppBundle\Entity\Collectible 
     */
    public function getCollectible1()
    {
        return $this->collectible1;
    }

    /**
     * Set collectible2
     *
     * @param \AppBundle\Entity\Collectible $collectible2
     * @return CollectionGroup
     */
    public function setCollectible2(\AppBundle\Entity\Collectible $collectible2 = null)
    {
        $this->collectible2 = $collectible2;

        return $this;
    }

    /**
     * Get collectible2
     *
     * @return \AppBundle\Entity\Collectible 
     */
    public function getCollectible2()
    {
        return $this->collectible2;
    }

    /**
     * Set collectible3
     *
     * @param \AppBundle\Entity\Collectible $collectible3
     * @return CollectionGroup
     */
    public function setCollectible3(\AppBundle\Entity\Collectible $collectible3 = null)
    {
        $this->collectible3 = $collectible3;

        return $this;
    }

    /**
     * Get collectible3
     *
     * @return \AppBundle\Entity\Collectible 
     */
    public function getCollectible3()
    {
        return $this->collectible3;
    }

    /**
     * Set collectible4
     *
     * @param \AppBundle\Entity\Collectible $collectible4
     * @return CollectionGroup
     */
    public function setCollectible4(\AppBundle\Entity\Collectible $collectible4 = null)
    {
        $this->collectible4 = $collectible4;

        return $this;
    }

    /**
     * Get collectible4
     *
     * @return \AppBundle\Entity\Collectible 
     */
    public function getCollectible4()
    {
        return $this->collectible4;
    }

    /**
     * Set collectible5
     *
     * @param \AppBundle\Entity\Collectible $collectible5
     * @return CollectionGroup
     */
    public function setCollectible5(\AppBundle\Entity\Collectible $collectible5 = null)
    {
        $this->collectible5 = $collectible5;

        return $this;
    }

    /**
     * Get collectible5
     *
     * @return \AppBundle\Entity\Collectible 
     */
    public function getCollectible5()
    {
        return $this->collectible5;
    }

    /**
     * Set collectible6
     *
     * @param \AppBundle\Entity\Collectible $collectible6
     * @return CollectionGroup
     */
    public function setCollectible6(\AppBundle\Entity\Collectible $collectible6 = null)
    {
        $this->collectible6 = $collectible6;

        return $this;
    }

    /**
     * Get collectible6
     *
     * @return \AppBundle\Entity\Collectible 
     */
    public function getCollectible6()
    {
        return $this->collectible6;
    }

    /**
     * Set collectible7
     *
     * @param \AppBundle\Entity\Collectible $collectible7
     * @return CollectionGroup
     */
    public function setCollectible7(\AppBundle\Entity\Collectible $collectible7 = null)
    {
        $this->collectible7 = $collectible7;

        return $this;
    }

    /**
     * Get collectible7
     *
     * @return \AppBundle\Entity\Collectible 
     */
    public function getCollectible7()
    {
        return $this->collectible7;
    }

    /**
     * Set collectible8
     *
     * @param \AppBundle\Entity\Collectible $collectible8
     * @return CollectionGroup
     */
    public function setCollectible8(\AppBundle\Entity\Collectible $collectible8 = null)
    {
        $this->collectible8 = $collectible8;

        return $this;
    }

    /**
     * Get collectible8
     *
     * @return \AppBundle\Entity\Collectible 
     */
    public function getCollectible8()
    {
        return $this->collectible8;
    }
}
