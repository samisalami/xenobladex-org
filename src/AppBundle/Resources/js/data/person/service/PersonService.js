'use strict';

angular.module('app')
    .factory('PersonService', PersonService);
        
PersonService.$inject = ['$http', '$filter'];

function PersonService($http, $filter) {
    var onPersonsChangedCallbacks = [];
    var onPersonDeletedCallbacks = [];
    var persons = null;
    var personsRequested = false;

    return {
        Person: Person,
        getPersons: getPersons,
        loadPersons: loadPersons,
        addPerson: addPerson,
        updatePerson: updatePerson,
        deletePerson: deletePerson,
        onPersonsChanged: onPersonsChanged,
        onPersonDeleted: onPersonDeleted,
        createFromResponse: createFromResponse
    };

    function Person(
        id,
        name,
        description,
        location_note,
        age,
        region,
        species,
        job,
        conditions,
        activity_time)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location_note = location_note;
        this.age = age;
        this.region = region;
        this.species = species;
        this.job = job;
        this.conditions = conditions;
        this.activity_time = activity_time;

        Object.seal(this);
    }

    function getPersons() {
        if(!personsRequested) {
            loadPersons();
        } else {
            return persons;
        }
    }

    function createFromResponse(person) {
        if (person) {
            return new Person(
                person['id'],
                person['name'],
                person['description'],
                person['location_note'],
                person['age'],
                person['region'],
                person['species'],
                person['job'],
                person['conditions'],
                person['activity_time']
            );
        }
    }

    function onPersonsChanged(callback) {
        onPersonsChangedCallbacks.push(callback);
    }

    function onPersonDeleted(callback) {
        onPersonDeletedCallbacks.push(callback);
    }

    function notifyPersonsChanged(persons) {
        onPersonsChangedCallbacks.forEach(function(callback){
            callback(persons);
        });
    }

    function notifyPersonDeleted(person) {
        onPersonDeletedCallbacks.forEach(function(callback){
            callback(person);
        });
    }

    function loadPersons() {
        personsRequested = true;
        var url = Routing.generate('get_persons');
        return $http
            .get(url)
            .then(function(response){
                persons = response.data.map(function(person){
                    return createFromResponse(person);
                });
                notifyPersonsChanged(persons);
            })
    }

    function addPerson(person) {
        var url = Routing.generate('add_person');
        return $http.post(url, person)
            .then(function(response){
                persons.push(response.data);
                notifyPersonsChanged(persons);
                return response;
            });
    }

    function updatePerson(person) {
        var url = Routing.generate('update_person', {id: person.id});
        return $http.put(url, person)
            .then(function(response){
                var index = persons.indexOf($filter('byId')(persons, person.id));
                persons.splice(index, 1, response.data);
                notifyPersonsChanged(persons);
                return response;
            });
    }

    function deletePerson(person) {
        var url = Routing.generate('delete_person', {id: person.id});
        return $http.delete(url)
            .then(function(response){
                var index = persons.indexOf($filter('byId')(persons, person.id));
                persons.splice(index, 1);
                notifyPersonsChanged(persons);
                notifyPersonDeleted(person);
                return response;
            });
    }
}