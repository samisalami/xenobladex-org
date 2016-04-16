<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FAQ
 *
 * @ORM\Table(name="xenobladex_faq")
 * @ORM\Entity
 */
class Faq
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
     * @ORM\Column(name="name", type="text", length=255)
     */
    private $name='';

    /**
     * @var string
     *
     * @ORM\Column(name="answer", type="text")
     */
    private $answer='';

    /**
     * @var string
     *
     * @ORM\Column(name="answer_read_more", type="text")
     */
    private $answer_read_more='';

    /**
     * @var string
     *
     * @ORM\Column(name="category", type="text", length=255)
     */
    private $category='Sonstiges';


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
     * Set answer
     *
     * @param string $answer
     * @return FAQ
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;

        return $this;
    }

    /**
     * Get answer
     *
     * @return string 
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Faq
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
     * Set category
     *
     * @param string $category
     * @return Faq
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return string 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set answer_read_more
     *
     * @param string $answerReadMore
     * @return Faq
     */
    public function setAnswerReadMore($answerReadMore)
    {
        $this->answer_read_more = $answerReadMore;

        return $this;
    }

    /**
     * Get answer_read_more
     *
     * @return string 
     */
    public function getAnswerReadMore()
    {
        return $this->answer_read_more;
    }
}
