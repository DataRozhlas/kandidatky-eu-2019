title: "Interaktivní kandidátky k eurovolbám: proklikejte si, koho volit"
perex: "Pro volby do Evropského parlamentu v pátek a sobotu 24. a 25. května jsme připravili přehlednou aplikaci, kde si můžete strany i samotné kandidáty seřadit podle toho, co je pro vás důležité: osoby lídra, věku, množství vysokoškolských titulů nebo podílu žen."
published: "11. dubna 2019"
coverimg: https://www.irozhlas.cz/sites/default/files/styles/zpravy_snowfall/public/uploader/komunalni-volby_1802_180823-084533_jab.png?itok=6XCgU6KR
coverimg_note: ""
styles: ["//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"]
libraries: [jquery, "https://d3js.org/d3.v3.min.js", datatables, "https://code.jquery.com/ui/1.12.1/jquery-ui.js", "https://cdn.datatables.net/plug-ins/1.10.19/sorting/diacritics-sort.js"]
options: [noheader, nopic]
---
<wide>
<div id="container">
	<div id="strany">
		<table id="tabulkaStran" class="display" style="width:100%"></table></div>
	<div id="kandidati"><table id="tabulkaKandidatu" class="display" style="width:100%"></table></div>
</div>
</wide>

_Zdroj dat: [volby.cz](https://volby.cz/pls/kv2018/kv?xjazyk=CZ&xid=1), [Wikipedia.cz](https://cs.wikipedia.org/wiki/Volby_do_Evropsk%C3%A9ho_parlamentu_v_%C4%8Cesku_2019)_

Ve volbách do evropského parlamentu letos kandiduje 844 kandidátů v 39 stranách a koalicích. Češi volí 21 europoslanců z celkových 705 (a nebo 751, pokud se voleb [zúčastní Spojené království](https://www.irozhlas.cz/zpravy-svet/konecne-datum-brexitu-theresa-mayova-brexit-summit-eu_1904110048_per)), kteří v parlamentu zasednou. Z voleb předčasně vypadla _[Moravská a Slezská pirátská strana](https://www.irozhlas.cz/zpravy-domov/eurovolby-2019-piratska-strana-evropsky-parlament_1904051930_nkr)_.

Ve volbách kandiduje šest koalic:

- _Dělnická strana sociální spravedlnosti - za národní suverenitu! (Dělnická strana sociální spravedlnosti, Národní fronta)_
- _Rozumní a národní demokracie - stop migraci - nechceme euro (Národní demokracie, Rozumní)_
- _Patrioti pro neutralitu (Česká strana národně sociální, Patrioti ČR)_
- _Svobodní, Liberland a Radostné Česko - odejdeme bez placení (Svobodní, Radostné Česko)_
- _Starostové (STAN) s regionálními partnery a TOP 09 (Starostové a nezávislí, TOP 09)_
- _Strana soukromníků České republiky a Nezávislí s podporou Občanské demokratické aliance a profesních společenstev (Nezávislí, Soukromníci)_

Přes 60 procent kandidátů všech stran má vysokoškolský titul. Mezi nimi vyčnívají _Vědci pro Českou republiku_, kde se může titulem pochlubit všech dvacet kandidátů. S jedenácti profesory a čtyřmi docenty jde o spolehlivě nejvzdělanější stranu, která se objevila v některých porevolučních českých volbách.

Pouze čtvrtina kandidátů jsou ženy. Volitelné pozice jsou ještě maskulinnější: na prvních třech místech všech kandidátek je 20 procent žen, lídryň je pouhých 13 procent. Mezi parlamentními stranami jsou to Dita Charanzová za _ANO_ a Kateřina Konečná z _KSČM_.

Průměrný věk kandidátů je 47,6 roku, o necelý rok víc než v minulých eurovolbách. K nejstarším patří například konstanta českých voleb, strana <span class="cibulkator">_Volte Pravý Blok_ (<span class="longer">klikněte, pokud stojíte o celý název partaje</span>)</span> s 16 kandidáty a průměrným věkem 58,9 let.

<style>
	.longer {
		text-decoration: underline;
		cursor: pointer;
	}
</style>

<script>
	var partaj = 'Volte Pravý Blok - stranu za snadnou a rychlou ODVOLATELNOST politiků a státních úředníků PŘÍMO OBČANY, za NÍZKÉ daně, VYROVNANÝ rozpočet, MINIMALIZACI byrokracie, SPRAVEDLIVOU a NEZKORUMPOVANOU policii a justici, REFERENDA a PŘÍMOU demokracii WWW.CIBULKA.NET, kandidující s nejlepším protikriminálním programem PŘÍMÉ demokracie a hlubokého národního, duchovního a mravního obrození VY NEVĚŘÍTE POLITIKŮM A JEJICH NOVINÁŘŮM? NO KONEČNĚ! VĚŘME SAMI SOBĚ!!! - ale i s mnoha dalšími DŮVODY, proč bychom měli jít tentokrát VŠICHNI K VOLBÁM, ale - pokud nechceme být ZNOVU obelháni, podvedeni a okradeni - NEVOLIT ŽÁDNOU PARLAMENTNÍ TUNEL - STRANU vládnoucí (post) komunistické RUSKO - ČESKÉ totalitní FÍZLOKRACIE a jejich likvidační protinárodní politiku ČÍM HŮŘE, TÍM LÉPE!!! - jenž žádá o volební podporu VŠECHNY ČESKÉ OBČANY a daňové poplatníky, kteří chtějí změnit dnešní kriminální poměry, jejichž jsme všichni obětí, v jejich pravý opak! V BOJI MEZI DOBREM A ZLEM, PRAVDOU A LŽÍ, NELZE BÝT NEUTRÁLNÍ A PŘESTO ZŮSTAT SLUŠNÝ!!! Proto děkujeme za Vaši podporu!!! Nevěříte-li na pokoru u popravčí káry, zdá-li se vám naše kandidátka málo dokonalá nebo postrádáte-li na ní zástupce své obce nebo města a přitom MÁTE ODVAHU v této válce Lidí Dobra s vládnoucími Lidmi Zla povstat z jimi naordinovaného občanského bezvědomí, kterým nás ničí a dnešní DEMOKRATURU, SKRYTOU TOTALITU a OTROKÁŘSTVÍ VYŠŠÍHO ŘÁDU zásadním způsobem změnit, KANDIDUJTE ZA NÁS!!! Kontakt: Volte Pravý Blok www.cibulka.net, PO BOX 229, 11121 Praha'

	$('.longer').click(function() {
		$('.cibulkator').html('<i>' + partaj + '</i>')
	})
</script>

Mezi parlamentními stranami je nejstarší _SPD Tomia Okamury_ s průměrem 53,2 roku. Tradičně mladí jsou _Piráti_ s 34,9 roku, překvapivě mladá kandidátka _ČSSD_ s 38,3 roku. K nejmladším patří také brněnský subjekt _Ano, vytrollíme europarlament_ s průměrným věkem kandidátů 34,7 roku.

Téměř čtvrtina kandidátů (v abs. počtu 194) je z Prahy, další v pořadí jsou Brno (71 kandidátů), s odstupem Plzeň (33 kandidátů) a Ostrava (23 kandidátů). Nejčastějším povoláním je podnikatel (25 kandidátů), právník, živnostník a ekonom (všechny 11 kandidátů). Osm kandidátů uvádí jako svoje povolání poslanec/poslankyně Evropského parlamentu.
