from django.contrib import admin
from .models import Card, Special, Minion, Spell, Cast, Deck

# Register your models here.

admin.site.register(Card)
admin.site.register(Special)
admin.site.register(Minion)
admin.site.register(Spell)
admin.site.register(Cast)
admin.site.register(Deck)
