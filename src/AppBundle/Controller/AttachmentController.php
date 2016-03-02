<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Service\AttachmentService;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Attachment;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\StreamedResponse;


class AttachmentController extends FOSRestController {
    /**
     * @var AttachmentService
     */
    private $attachmentService;

    public function __construct(AttachmentService $attachmentService) {

        $this->attachmentService = $attachmentService;
    }

    /**
     * @Route("/attachment", methods={"GET"})
     * @return Response
     */
    public function getAttachmentsAction() {
        $em = $this->getDoctrine()->getManager();
        $attachments = $em->getRepository('AppBundle:Attachment')->findAll();

        $view = $this->view($attachments, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("api/attachment", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function addAttachmentAction(Request $request) {
        $file = $request->files->get('file');

        if(!empty($file)) {
            $attachment = $this->attachmentService->createAttachmentFromUpload($file);

            $em = $this->getDoctrine()->getManager();
            $em->persist($attachment);
            $em->flush();

            $view = $this->view($attachment, 200);
            return $this->handleView($view);
        } else {
            // TODO: error handling
            return new Response(Response::HTTP_OK);
        }
    }

    /**
     * @Route("api/attachment/{id}", methods={"PUT"}, requirements={"id"="^[0-9].*$"})
     */
    public function updateAttachmentAction(Request $request, Attachment $attachment) {
        $serializer = $this->get("jms_serializer");
        $data = $request->getContent();

        $context = new DeserializationContext();
        $context->setAttribute('target', $attachment);
        $attachment = $serializer->deserialize($data, 'AppBundle\Entity\Attachment', 'json', $context);

        $em = $this->getDoctrine()->getManager();
        $em->persist($attachment);
        $em->flush();

        $view = $this->view($attachment, 200);
        return $this->handleView($view);
    }

    /*
     * @ParamConverter("attachment", class="AppBundle:Attachment")
     * @Route("api/attachment/{id}", methods={"DELETE"})
     */
    public function deleteAttachmentAction(Request $request, Attachment $attachment) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($attachment);
        $em->flush();

        $this->attachmentService->removeAttachmentFileFromServer($attachment);

        return new Response(Response::HTTP_OK);
    }

    /*
     * @ParamConverter("attachment", class="AppBundle\Entity\Attachment")
     */
    public function showAttachmentAction(Attachment $attachment) {
        $attachment_file_path = $this->attachmentService->getFullPathToAttachmentFile($attachment);
        if (file_exists($attachment_file_path)) {
            $response = new StreamedResponse();
            $response->setCallback(
                function () use ($attachment_file_path) {
                    readfile($attachment_file_path);
                    flush();
                }
            );

            $response->headers->set(
                'Content-Type',
                $attachment->getMimeType()
            );
            return $response;
        }
        return new Response(Response::HTTP_NOT_FOUND);
    }
}