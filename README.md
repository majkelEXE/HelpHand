
# HelpHand

HelpHand to aplikacja internetowa mająca za zadania reorganizacje zbiórek, a także wolontariatów. Wspólnie stwierdziliśmy, że przydałoby się rozwiązanie, które w jasny i czytelny sposób dostarczyłoby informacji o wszystkich odbywających się akcjach i zbiórkach.


![Logo](https://i.imgur.com/tCHVZjd.png)


## Demo
Currently the demo is off :((
https://mdubrowski.usermd.net
## Features
Pierwszą z nich możemy utożsamić ze Zbiórkami(zakładka „Zbiórki” na stronie). Na stronie użytkownik jest w stanie zobaczyć wszystkie istniejące zbiórki, oczywiście są to zbiórki fizyczne, więc nie ma wsród nich żadnych zbiórek gotówki online, bądź innych tego typu. Użytkownik w praktyce może zobaczyć szczegóły odnośnie danej zbiórki, takie jak opis, mapka z dokładną lokalizacją zbiórki, czy dane kontaktowe do osoby organizującej zbiórkę. Możliwe jest także zobaczenie wolontariuszy, którzy są potrzebni do danej zbiórki.
![App Screenshot](https://i.imgur.com/BhDgsCA.png)
![App Screenshot](https://i.imgur.com/CyRKOQC.png)

Kolejna sekcja to Wolontariaty(zakładka „Wolontariaty” na stronie). Wolontariat rozumiemy jako funckje pełnioną przez daną osobę bezinteresownie, stąd wśród wolontariatów znajdziemy zgłoszenia odnośnie osób potrzebnych do noszenia psiej karmy, osób pomagajacych w bibliotece, tłumaczy języków obcych czy wielu innych. Istnieje możliwość powiązania wolontariatu z daną zbiórką, choć to nie jest to konieczne, gdyż wolontariat dotyczyć może innej dziedziny niż organizacja zbiórki. Klikając w wolontariat podobnie jak w przypadku zbiórki zobaczymy szczegółowe informacje, w tym wymagane umiejętności wolontariusza, kontakt do osoby odpowiedzialnej za dany wolontariat, a także możliwość aplikacji na dany wolontariat(po stworzeniu wiadomości trafia ona bezpośrednio na maila podanego w sekcji „Kontakt” danego wolontariatu).
![App Screenshot](https://i.imgur.com/kJufdQ6.png)
![App Screenshot](https://i.imgur.com/gKufdlr.png)

Trzecia sekcja to Mapa Zbiórek(zakładka „Mapa Zbiórek” na stronie). Jest to sekcja która na mapie obrazuje dokładne miejsca utworzonych zbiórek. Użytkownik ma możliwość zobaczenia informacji o danej zbiórce klikając dany znacznik na mapie.
![App Screenshot](https://i.imgur.com/9wYwKgu.png)

Ostatnią sekcją dostępną dla niezalogowanych użytkowników jest Edukacja(zakładka „Edukacja” na stronie). To zakładka, w której można zapoznać się z ideą zbiórek i wolontariatów. Odbywa się to poprzed rozpoczęcie krótkiej prezentacji zakończonej quizem, dzięki którym użytkownik może nabyć nową wiedzę w tematyce pomocy społecznej.
![App Screenshot](https://i.imgur.com/igvK4c8.png)
![App Screenshot](https://i.imgur.com/9smiCCD.png)

Piąta sekcja opiera się na panelu zbiorek i wolontariatów(użytkownik musi się zarejestrować, bądź zalogować, aby w prawym górnym rogu dostrzec opcje Panel, która tak naprawdę daje dwie możliwości: administracja zbiórkami oraz administracja wolontariatami. Użytkownik wybiera spośród opcji, po czym przenosi się do panelu gdzie znajdują się tylko i wyłącznie utworzone przez niego ogłoszenia. Ma możliwość dodania, następnie usunięcia bądź update’u powstałych ogłoszeń. Przy tworzeniu ważne jest to aby podać wszystkie dane, w tym realny adres email i telefon, gdyż weryfikacja nie przepuści zbyt abstrakcyjnego numeru telefonu i niepoprawnego maila. 
Gdy użytkownik dodaje wolontariat widzi panel „Wymagania”, który odpowiada wymaganiom danego wolontariusza, przykładowo wolontariat „Noszenie psiej karmy” będzie miał wymaganie „siła fizyczna”. 
Gdy użytkownik dodaje zbiórkę, musi zaznaczyć lokalizacje. Aby wybrać lokalizacje należy kliknąć w odpowiednie miejsce na mapie, w miejscu którego pojawi się czerwony dymek z dokładną lokalizacją. Ponadto, istnieje także możliwość przypisania wolontariuszy do zbiórki. Użytkownik może przypisać tylko utworzonych przez siebie wolontariuszy do zbiórki, dlatego jeśli chce ich przypisać to zalecane jest urprzednie stworzenie wolontariusza, bądź późniejszy update zbiórki w celu dopisania wolontariusza. Na czerwono podświetlani są przypisani wolontariusze. Należy zaznaczyć, iż usuwając zbiórkę do której przypisani są wolontariusze, usuwani są także wolontariusze do niej przypisani.
![App Screenshot](https://i.imgur.com/9UJ0CrF.png)
![App Screenshot](https://i.imgur.com/7xq1Qnf.png)
![App Screenshot](https://i.imgur.com/KWiEMvX.png)
## Tech Stack

**Client:**
- ReactJS
- Typescript
- Axios
- React-map-gl
- Mapbox-gl
- Maplibre-gl
- React-responsive
- React-transition-group
- React-router
- RecoilJS
- Geoapify API
- Maptiler API

**Server:**
- Django
- Django Rest Framework
- Pillow
- Django Rest Password Reset
- PySocks
- Django Environ
- Asgiref
- MySQL


## Authors

- [@IgorBialek](https://www.github.com/IgorBialek)
- [@MajkelEXE](https://www.github.com/MajkelEXE)

