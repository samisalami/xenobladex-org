<?php
/**
 * Created by: SamiSalami (Samjessa Lewy) // 11.12.2015 - 20:14
 */

namespace AppBundle\Controller;

use AppBundle\Service\AttachmentService;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use AppBundle\Entity\Attachment;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\StreamedResponse;


class AttachmentController extends FOSRestController {
    protected function getJMSSerializer() {
        return $this->get('jms_serializer');
    }

    protected function deleteAttachment(Attachment $attachment) {
        $em = $this->getDoctrine()->getManager();
        $em->remove($attachment);
        $em->flush();
    }

    protected function addAttachment(Attachment $deserialized_attachment) {
        $em = $this->getDoctrine()->getManager();
        $attachment = $em->merge($deserialized_attachment);
        $em->persist($attachment);
        $em->flush();
    }

    protected function updateAttachment(Attachment $deserialized_attachment) {
        $em = $this->getDoctrine()->getManager();
        $updated_attachment = $em->merge($deserialized_attachment);
        $em->flush();
    }

    /**
     * @return Response
     */
    public function getAttachmentsAction() {
        $em = $this->getDoctrine()->getManager();
        $attachments = $em->getRepository('AppBundle:Attachment')->findAll();
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($attachments, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/attachment/add", methods={"POST"})
     */
    public function addAttachmentAction(Request $request) {
        $file = $request->files->get('file');

        if(!empty($file)) {
            $attachment_service = new AttachmentService();
            $attachment = $attachment_service->createAttachmentFromUpload($file);

            $this->addAttachment($attachment);

            $serializer = $this->getJMSSerializer();
            $response = new Response($serializer->serialize($attachment, 'json'));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        } else {
            // TODO: error handling
            return new Response(Response::HTTP_OK);
        }
    }

    /**
     * @Route("/attachment/update", methods={"POST"})
     */
    public function updateAttachmentAction(Request $request) {
        $content = $request->getContent();
        if(!empty($content)) {
            $serializer = $this->getJMSSerializer();
            $deserialized_attachment = $serializer->deserialize($content, 'AppBundle\Entity\Attachment', 'json');
            $this->updateAttachment($deserialized_attachment);
            $response = new Response($serializer->serialize($deserialized_attachment, 'json'));

            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return new Response(Response::HTTP_OK);
    }

    /*
     * @ParamConverter("attachment", class="AppBundle:Attachment")
     */
    public function deleteAttachmentAction(Request $request, Attachment $attachment) {
        $this->deleteAttachment($attachment);
        $attachment_service = new AttachmentService();
        $attachment_service->removeAttachmentFileFromServer($attachment);
        $serializer = $this->getJMSSerializer();
        $response = new Response($serializer->serialize($attachment, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /*
     * @ParamConverter("attachment", class="AppBundle\Entity\Attachment")
     */
    public function showAttachmentAction(Attachment $attachment) {
        $attachment_service = new AttachmentService();
        $attachment_file_path = $attachment_service->getFullPathToAttachmentFile($attachment);
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
        } else {
            //TODO: error handling
            return new Response(Response::HTTP_OK);
        }

        return $response;
    }
}