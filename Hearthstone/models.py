from django.db import models
from django.apps import apps

# Create your models here.


class Special(models.Model):
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.type


class Cast(models.Model):
    ability = models.CharField(max_length=100)

    def __str__(self):
        return self.ability


class Card(models.Model):
    name = models.CharField(max_length=20)
    specialDescription = models.CharField(max_length=100)
    className = models.CharField(max_length=30, default="Neutral", validators=["Rogue", "Mage", "Druid", "Warrior", "Priest", "Paladin", "Warlock", "Shaman", "Hunter", "Neutral"])
    image = models.ImageField(null=True)

    def __str__(self):
        return self.name + " " + self.specialDescription


class Spell(Card):
    ability = models.ForeignKey(Cast, on_delete=models.CASCADE)

    def __str__(self):
        return self.name+ " " + self.ability.ability


class Minion(Card):
    attack = models.IntegerField()
    health = models.IntegerField()
    special = models.ForeignKey(Special, on_delete=models.CASCADE)
    ability = models.ForeignKey(Spell, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name + " " + str(self.attack) + " " + str(self.health) + " " + self.special.type


class Deck(models.Model):
    name = models.CharField(max_length=20)
    deckClass = models.CharField(max_length=20, validators=["Rogue", "Mage", "Druid", "Warrior", "Priest", "Paladin", "Warlock", "Shaman", "Hunter"], null=True)
    minions = models.ManyToManyField(Minion)
    spells = models.ManyToManyField(Spell)

    def addMinion(self, minion):
        number = self.minions.filter(name=minion.name).count()
        print("number of apperances: ")
        print(number)
        if number < 1:
            print("Entered first case")
            self.minions.add(minion)
        else:
            print("before filter")
            string = minion.name + " copy"
            print(string)
            try:
                copy = Minion.objects.get(name=string)
                #opy = apps.get_model(app_label='Hearthstone', model_name='Minion')
                print("after filter")
                print(copy)
                self.minions.add(copy)
            except Minion.DoesNotExist:
                print("error Minion does not exist")

    def addSpell(self, spell):
        number = self.spells.filter(name=spell.name).count()
        print("number of apperances: ")
        print(number)
        if number < 1:
            self.spells.add(spell)
        else:
            string = spell.name + " copy"
            try:
                copy = Spell.objects.get(name=string)
                self.spells.add(copy)
            except Spell.DoesNotExist:
                print("Error spell does not exist")

    def __str__(self):
        return self.name + " " + self.deckClass


class GameBoard(models.Model):
    type = models.IntegerField()
    decks = models.ManyToManyField(Deck)


class PlayerBoard(models.Model):
    cards = models.ForeignKey(Card)
    board = models.ForeignKey(GameBoard)
