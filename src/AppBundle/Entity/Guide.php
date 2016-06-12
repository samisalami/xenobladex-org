<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * Guide
 *
 * @ORM\Table(name="xenobladex_guide")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 */
class Guide
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
     * @var string
     *
     * @ORM\Column(name="author", type="string", length=255)
     */
    private $author = '';

    /**
     * @var \DateTimeInterface
     *
     * @ORM\Column(name="last_edited", type="datetime")
     */
    private $lastEdited;

    /**
     * @var \DateTimeInterface
     *
     * @ORM\Column(name="created", type="datetime")
     */
    private $created;

    /**
     * @var string
     *
     * @ORM\Column(name="copy", type="text")
     */
    private $copy = '';

    /**
     * @ORM\PrePersist()
     */
    public function createdDatetime() {
        $this->setLastEdited(new \DateTime());
        $this->setCreated(new \DateTime());
    }

    /**
     * @ORM\PreUpdate()
     */
    public function updateLastEditedDatetime() {
        $this->setLastEdited(new \DateTime());
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
     * @return Guide
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
     * Set copy
     *
     * @param string $copy
     * @return Guide
     */
    public function setCopy($copy)
    {
        $this->copy = $copy;

        return $this;
    }

    /**
     * Get copy
     *
     * @return string 
     */
    public function getCopy()
    {
        return $this->copy;
    }

    /**
     * Set author
     *
     * @param string $author
     * @return Guide
     */
    public function setAuthor($author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author
     *
     * @return string 
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set lastEdited
     *
     * @param \DateTime $lastEdited
     * @return Guide
     */
    public function setLastEdited($lastEdited)
    {
        $this->lastEdited = $lastEdited;

        return $this;
    }

    /**
     * Get lastEdited
     *
     * @return \DateTime 
     */
    public function getLastEdited()
    {
        return $this->lastEdited;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Guide
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime 
     */
    public function getCreated()
    {
        return $this->created;
    }
}
