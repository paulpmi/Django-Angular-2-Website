"""angular URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from Hearthstone import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', views.Cards)
router.register(r'specials', views.SpecialModel)
router.register(r'abilities', views.AbilityModel)
router.register(r'decks', views.DeckModel)

#urlpatterns = router.urls

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^addSpecial', views.addSpecial),
    url(r'^deleteSpecial', views.deleteSpecial),
    url(r'^getSpecial', views.getSpecials),
    url(r'^addMinion', views.addMinion),
    url(r'^addSpell', views.addSpell),
    url(r'^getCard', views.getCards),
    url(r'^addToDeck', views.addCardToDeck),
    url(r'^addDeck', views.createDeck),
    url(r'^admin/', admin.site.urls),
    url(r'^getTheCardsOfDeck2', views.getCardsOfDeck),
]
