'use strict';

angular.module('app')
    .factory('ServiceDataParserService', ServiceDataParserService);

function ServiceDataParserService() {

  return {
    parseRelation: parseRelation
  };
  
  function parseRelation(object, property) {
    object[property] = object[property].id;
  }
}