from rest_framework import serializers
from .models import Card, Special, Cast, Deck


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('name', 'specialDescription')


class SpecialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Special
        fields = ('type',)


class AbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Cast
        fields = ('ability',)


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ('name', 'deckClass', 'minions', 'spells')
