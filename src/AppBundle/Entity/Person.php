<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;

/**
 * Person
 *
 * @ORM\Table(name="xenobladex_person")
 * @ORM\Entity
 */
class Person
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
    private $name = '';

    /**
     * @var integer
     *
     * @ORM\Column(name="age", type="string", length=255)
     */
    private $age = '';

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description = '';

    /**
     * @var string
     *
     * @ORM\Column(name="location_note", type="text")
     */
    private $locationNote = '';

    /**
     * @var string
     *
     * @ORM\Column(name="region", type="string", length=255)
     */
    private $region = '';

    /**
     * @var string
     *
     * @ORM\Column(name="species", type="string", length=255)
     */
    private $species = '';

    /**
     * @var string
     *
     * @ORM\Column(name="job", type="string", length=255)
     */
    private $job = '';

    /**
     * @var string
     *
     * @ORM\Column(name="conditions", type="text")
     */
    private $conditions = '';

    /**
     * @var string
     *
     * @ORM\Column(name="activity_time", type="string", length=255)
     */
    private $activityTime = '';

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="PersonMapmarker", mappedBy="person", cascade={"persist"})
     * @Type("ArrayCollection<AppBundle\Entity\PersonMapmarker>")
     */
    private $mapmarkers;

    /**
     * Person constructor.
     */
    public function __construct()
    {
        $this->mapmarkers = new ArrayCollection();
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
     * Set name
     *
     * @param string $name
     * @return Person
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
     * Set age
     *
     * @param integer $age
     * @return Person
     */
    public function setAge($age)
    {
        $this->age = $age;

        return $this;
    }

    /**
     * Get age
     *
     * @return integer 
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Person
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set locationNote
     *
     * @param string $locationNote
     * @return Person
     */
    public function setLocationNote($locationNote)
    {
        $this->locationNote = $locationNote;

        return $this;
    }

    /**
     * Get locationNote
     *
     * @return string 
     */
    public function getLocationNote()
    {
        return $this->locationNote;
    }

    /**
     * Set species
     *
     * @param string $species
     * @return Person
     */
    public function setSpecies($species)
    {
        $this->species = $species;

        return $this;
    }

    /**
     * Get species
     *
     * @return string 
     */
    public function getSpecies()
    {
        return $this->species;
    }

    /**
     * Set conditions
     *
     * @param string $conditions
     * @return Person
     */
    public function setConditions($conditions)
    {
        $this->conditions = $conditions;

        return $this;
    }

    /**
     * Get conditions
     *
     * @return string 
     */
    public function getConditions()
    {
        return $this->conditions;
    }

    /**
     * Set activityTime
     *
     * @param string $activityTime
     * @return Person
     */
    public function setActivityTime($activityTime)
    {
        $this->activityTime = $activityTime;

        return $this;
    }

    /**
     * Get activityTime
     *
     * @return string 
     */
    public function getActivityTime()
    {
        return $this->activityTime;
    }

    /**
     * Set job
     *
     * @param string $job
     * @return Person
     */
    public function setJob($job)
    {
        $this->job = $job;

        return $this;
    }

    /**
     * Get job
     *
     * @return string 
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * Set region
     *
     * @param string $region
     * @return Person
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
     * Add mapmarkers
     *
     * @param \AppBundle\Entity\PersonMapmarker $mapmarkers
     * @return Person
     */
    public function addMapmarker(\AppBundle\Entity\PersonMapmarker $mapmarker)
    {
        if (!$this->mapmarkers->contains($mapmarker)) {
            $this->mapmarkers->add($mapmarker);
            $mapmarker->setPerson($this);

            return $this;
        }
    }

    /**
     * Remove mapmarkers
     *
     * @param \AppBundle\Entity\PersonMapmarker $mapmarkers
     */
    public function removeMapmarker(\AppBundle\Entity\PersonMapmarker $mapmarker)
    {
        $this->mapmarkers->removeElement($mapmarker);
        $mapmarker->setPerson(NULL);
    }

    /**
     * Get mapmarkers
     *
     * @return ArrayCollection
     */
    public function getMapmarkers()
    {
        return $this->mapmarkers;
    }
}
