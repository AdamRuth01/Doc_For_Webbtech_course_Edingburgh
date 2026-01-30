# 🚀 GitHub Pages Setup Guide

## Steg-för-steg Instruktioner

### Steg 1: Pusha Alla Filer till GitHub

Om du inte redan gjort det, se till att alla filer är pushat:

```bash
git add .
git commit -m "Complete escape room game"
git push origin main
```

---

### Steg 2: Aktivera GitHub Pages

1. **Gå till din GitHub repository:**
   - Öppna: `https://github.com/AdamRuth01/Doc_For_Webbtech_course_Edingburgh`

2. **Öppna Settings:**
   - Klicka på **"Settings"** tabben (högst upp i repository)

3. **Hitta Pages-sektionen:**
   - Scrolla ner i vänstermenyn
   - Klicka på **"Pages"** (under "Code and automation")

4. **Konfigurera Pages:**
   - Under **"Source"**, välj:
     - **Branch:** `main` (eller `master` om det är din huvudbranch)
     - **Folder:** `/ (root)` (root-mappen)
   - Klicka på **"Save"**

5. **Vänta på Deployment:**
   - GitHub kommer att bygga och publicera din sida
   - Det tar vanligtvis 1-2 minuter
   - Du ser en grön bock när det är klart

---

### Steg 3: Hitta Din URL

Efter deployment kommer din sida att vara tillgänglig på:

**URL:** `https://adamruth01.github.io/Doc_For_Webbtech_course_Edingburgh/`

**Viktigt:** 
- URL:en är case-sensitive (stora/små bokstäver spelar roll)
- Om ditt repository heter `Doc_For_Webbtech_course_Edingburgh` måste URL:en matcha exakt

---

### Steg 4: Testa Din Sida

1. Öppna URL:en i en webbläsare
2. Testa att spelet fungerar:
   - Startskärmen visas
   - Alla 5 rum fungerar
   - Responsiv design fungerar på mobil

---

## 🔧 Felsökning

### Problem: "404 - Page not found"

**Lösningar:**
- Kontrollera att `index.html` finns i root-mappen (inte i en undermapp)
- Vänta 2-3 minuter efter att du aktiverat Pages (det kan ta tid)
- Kontrollera att branch-namnet är korrekt (`main` eller `master`)
- Se till att du har pushat alla filer till GitHub

### Problem: CSS/JS laddas inte

**Lösningar:**
- Kontrollera att sökvägarna i `index.html` är relativa (inte absoluta):
  - ✅ Korrekt: `href="css/styles.css"`
  - ❌ Fel: `href="/css/styles.css"` eller `href="C:/..."`
- Kontrollera att filerna finns på GitHub (gå till repository och kolla)

### Problem: Sida visar bara README

**Lösningar:**
- Se till att `index.html` finns i root-mappen
- Kontrollera att GitHub Pages är konfigurerad att använda root-mappen (`/ (root)`)
- Filen `.nojekyll` ska finnas i root (förhindrar Jekyll-processing)

---

## 📝 Uppdatera Din Sida

När du gör ändringar:

1. **Gör ändringar lokalt**
2. **Commit och push:**
   ```bash
   git add .
   git commit -m "Beskrivning av ändringar"
   git push origin main
   ```
3. **Vänta 1-2 minuter** - GitHub Pages uppdateras automatiskt
4. **Ladda om sidan** (Ctrl+F5 för att rensa cache)

---

## ✅ Checklista

- [ ] Alla filer är pushat till GitHub
- [ ] `index.html` finns i root-mappen
- [ ] GitHub Pages är aktiverad i Settings
- [ ] Branch är satt till `main` (eller `master`)
- [ ] Folder är satt till `/ (root)`
- [ ] Deployment är klar (grön bock)
- [ ] Sida fungerar på URL:en
- [ ] Alla rum fungerar korrekt

---

## 🎮 Din Spel-URL

När allt är klart kommer ditt escape room-spel att vara tillgängligt på:

**🔗 https://adamruth01.github.io/Doc_For_Webbtech_course_Edingburgh/**

Dela denna länk med andra för att de ska kunna spela ditt spel! 🎉
