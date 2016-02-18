<?php

namespace AppBundle\Form;

use Doctrine\Common\Persistence\ObjectManager;
use FOS\RestBundle\Form\Transformer\EntityToIdObjectTransformer;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @property ObjectManager manager
 */
class MissionType extends AbstractType
{
    /**
     * MissionType constructor.
     * @param ObjectManager $manager
     */
    public function __construct(ObjectManager $manager)
    {
        $this->manager = $manager;
    }
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('description')
            ->add('location_note')
            ->add('conditions')
            ->add('tasks')
            ->add('solution')
            ->add('rewards')
            ->add('person_unrelated')
            ->add('has_person')
            ->add('target_area')
            ->add('sidejob_type')
            ->add('difficulty')
            ->add('blade_level')
            ->add('chapter')
            ->add($builder->create('mission_type', 'text')
                ->addModelTransformer(new EntityToIdObjectTransformer($this->manager, 'AppBundle\Entity\MissionType')
            ))
            ->add($builder->create('person', 'text')
                ->addModelTransformer(new EntityToIdObjectTransformer($this->manager, 'AppBundle\Entity\Person')
            ));
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Mission',
            'csrf_protection'   => false,
            'allow_extra_fields' => true
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return '';
    }
}
