<?php
namespace AppBundle\Service;

use Ramsey\Uuid\Uuid;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use AppBundle\Entity\Attachment;

class AttachmentService {
    const UPLOAD_PATH = 'uploads/';
    const UPLOAD_ROOT_DIR = __DIR__.'/../../../web/';

    public function createAttachmentFromUpload(UploadedFile $file){
        $attachment = new Attachment();
        $attachment->setUuid(Uuid::uuid4());
        $attachment->setFileName($attachment->getUuid().'.'.$file->guessExtension());
        $attachment->setMimeType($file->getMimeType());

        $file->move(self::UPLOAD_PATH, $attachment->getFileName());

        return $attachment;
    }

    public function getFullPathToAttachmentFile(Attachment $attachment) {
        return self::UPLOAD_ROOT_DIR.self::UPLOAD_PATH.$attachment->getFileName();
    }

    public function removeAttachmentFileFromServer(Attachment $attachment) {
        $fs = new Filesystem();
        $fs->remove($this->getFullPathToAttachmentFile($attachment));
    }
}