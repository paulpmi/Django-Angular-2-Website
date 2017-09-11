import json

from django.core import serializers
from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView, View

from rest_framework import views, viewsets
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Card, Special, Minion, Spell, Cast, Deck

from .serializers import CardSerializer, SpecialSerializer, AbilitySerializer, DeckSerializer
# Create your views here.


class ViewCards(DetailView):
    template_name = 'hearthstone/cards.html'
    model = Card
    queryset = Card.objects.all()
    context_object_name = 'Card'

    def get_context_data(self, **kwargs):
        context = super(ViewCards, self).get_context_data(**kwargs)
        return context


class Cards(viewsets.ModelViewSet):

    serializer_class = CardSerializer
    queryset = Card.objects.all()

    def get(self, request):
        print("qqqqqqqqqq")
        return HttpResponse("Hello")

    def post(self, request):
        print("asfagasgas")
        json.loads(request)
        #response["Allow-Control-Origin"] = '*'
        print("Here")
        return HttpResponse("Hello2")


class SpecialModel(viewsets.ModelViewSet):
    serializer_class = SpecialSerializer
    queryset = Special.objects.all()

    @api_view(['POST'])
    @csrf_exempt
    def post(self, request):
        print("Begin POST")
        name = request.body
        print(name)
        s = Special(name)
        s.save()
        return HttpResponse("Hello2")

    def perform_create(self, serializer):
        print("YO")
        serializer.save(user=self.request.special)


class AbilityModel(viewsets.ModelViewSet):
    serializer_class = AbilitySerializer
    queryset = Cast.objects.all()


class DeckModel(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    queryset = Deck.objects.all()


@api_view(['POST', 'PUT'])
@csrf_exempt
def addMinion(request):
    data = json.loads(request.body)
    print(data)
    inside = data['foo']
    name = inside['name']
    attack = inside['attack']
    health = inside['health']
    specialDesc = inside['specialDescription']
    special = inside['special']['type']
    image = inside['image']
    minionClass = inside['class']
    try:
        Minion.objects.get(name=name)
        return HttpResponse("Add Error")
    except Minion.DoesNotExist:
        specialObjectr = Special(special)
        idObject = Special.objects.get(type=special)
        card = Minion(name=name, attack=attack, health=health, specialDescription=specialDesc, special=idObject, image=image, className=minionClass)
        card.save()
        card2 = Minion(name=name+" copy", attack=attack, health=health, specialDescription=specialDesc, special=idObject, image=image, className=minionClass)
        card2.save()
        return HttpResponse("Add Complete")


@api_view(['POST', 'PUT'])
@csrf_exempt
def addSpell(request):
    data = json.loads(request.body)
    name = data['name']
    ability = data['ability']['ability']
    specialDesc = data['specialDescription']
    try:
        Spell.objects.get(name=name)
        return HttpResponse("Add Error")
    except Card.DoesNotExist:
        print(data)
        print(ability)
        #abilityObj = Cast(ability)
        #abilityObj.save()
        idObj = Cast.objects.get(ability=ability)
        card = Spell(name=name, specialDescription=specialDesc, ability=idObj)
        card.save()
        card2 = Spell(name=name+" copy", specialDescription=specialDesc, ability=idObj)
        card2.save()
        return HttpResponse("Add Complete")


@api_view(['POST', 'PUT'])
@csrf_exempt
def addSpecial(request):
    #data = request.POST.get('special')
    data = json.loads(request.body)
    print(data)
    try:
        Special.objects.get(type=data)
        return HttpResponse("Error at add")
    except Special.DoesNotExist:
        special = Special(type=data)
        special.save()
        return HttpResponse("Add Complete")


@api_view(['POST'])
@csrf_exempt
def deleteSpecial(request):
    id = json.loads(request.body)
    s = Special()
    s.delete(id)
    s.save()
    return HttpResponse("Delete Complete")


@api_view(['GET'])
@csrf_exempt
def getSpecials(request):
    response_data = serializers.serialize('json', Special.objects.all())
    return HttpResponse(json.loads(response_data), content_type="application/json")


@api_view(['GET'])
@csrf_exempt
def getAllCards(request):
    data = []
    for i in Card.objects.all():
        if 'copy' not in i.name:
            data.append(i)
    print(data)
    #print("wrking")
    response_data = serializers.serialize('python', data)
    actual_data = [d['fields'] for d in response_data]
    return HttpResponse(json.dumps(actual_data), content_type="application/json")


@api_view(['GET'])
@csrf_exempt
def getCards(request):
    data = []
    parameters = request.GET
    print("HERE")
    print(parameters['deckClass'])
    for i in Card.objects.filter(className=parameters['deckClass']):
        if 'copy' not in i.name:
            data.append(i)
    for i in Card.objects.filter(className="Neutral"):
        if 'copy' not in i.name:
            data.append(i)
    print(data)
    #print("wrking")
    response_data = serializers.serialize('python', data)
    actual_data = [d['fields'] for d in response_data]
    return HttpResponse(json.dumps(actual_data), content_type="application/json")


@api_view(['GET'])
@csrf_exempt
def getDecks(request):
    data = []
    for i in Deck.objects.all():
        if 'copy' not in i.name:
            data.append(i)
    response_data = serializers.serialize('json', data)
    return HttpResponse(json.loads(response_data), content_type="application/json")


@api_view(['GET'])
@csrf_exempt
def getCardsOfDeck(request):
    print("BEFORE")
    #data = json.loads(request.body)
    print(request.GET)
    data = request.GET
    print(data['name']+' '+data['deckClass'])
    print(Deck.objects.get(name=data['name'], deckClass=data['deckClass']))
    deck = Deck.objects.get(name=data['name'], deckClass=data['deckClass'])
    response_data = serializers.serialize('json', [deck, ])
    data = json.loads(response_data)
    print(data)
    del data[0]['model']
    del data[0]['pk']
    del data[0]['fields']['name']
    del data[0]['fields']['deckClass']

    print(data[0]['fields'])

    power = []
    for i in data[0]['fields']['minions']:
        if 'copy' not in Minion.objects.get(pk=i).name:
            power.append(Minion.objects.get(pk=i).name)
        else:
            power.append(Minion.objects.get(pk=i-1).name)
    for i in data[0]['fields']['spells']:
        if 'copy' not in Spell.objects.get(pk=i).name:
            power.append(Spell.objects.get(pk=i).name)
        else:
            power.append(Spell.objects.get(pk=i-1).name)
    print(power)
    return HttpResponse(json.dumps(power), content_type="application/json")


@api_view(['POST', 'PUT'])
@csrf_exempt
def createDeck(request):
    data = json.loads(request.body)
    print(data)
    nameDeck = data['name']
    classDeck = data['className']
    deck = Deck(name=nameDeck, deckClass=classDeck)
    deck.save()
    return HttpResponse("Add Complete")


@api_view(['POST', 'PUT'])
@csrf_exempt
def addCardToDeck(request):
    data = json.loads(request.body)
    print(data)
    name = data['card']['name']
    specialDesc = data['card']['specialDescription']
    deckName = data['deck']['name']
    deckClass = data['deck']['className']
    try:
        Card.objects.get(name=name)
        try:
            card = Minion.objects.get(name=name, specialDescription=specialDesc)
            print("Minion")
            deck = Deck.objects.get(name=deckName, deckClass=deckClass)
            print(deck)
            deck.addMinion(card)
            return HttpResponse("PowerPlant")
        except Minion.DoesNotExist:
            card = Spell.objects.get(name=name, specialDescription=specialDesc)
            deck = Deck.objects.get(name=deckName, deckClass=deckClass)
            deck.addSpell(card)
            print("Spell")
            return HttpResponse("PowerPlant")
    except Card.DoesNotExist:
        return HttpResponse("Error")

