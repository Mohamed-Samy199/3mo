# ربط فورم 3Mo مع Contact Hub

الفورم يستدعي `POST /api/contact/3mo` ويرسل JSON مطابقًا للباك إند الأصلي: `name` و`email` و`message`، مع `subject` و`extra.projectType` و`website` الفارغ للحماية من السبام. أُزيل Budget من الواجهة ومن الطلب. لا يحتاج الفرونت SMTP أو بيانات MongoDB.

## تشغيل الباك إند على جهازك

استخدم نسخة `contact-hub-backend` المعدّلة المرفقة، أو طبّق التعديلات الموجودة في `backend-3mo.patch` على مستودعك الأصلي. التغييرات تخص إعداد الموقع فقط؛ لم تُحذف المواقع الأخرى ولم يتم دفع أي تغيير إلى GitHub.

```bash
cd contact-hub-backend
npm ci
cp .env.example .env
```

شغّل MongoDB محليًا. عدّل `.env` في الباك إند بالقيم الصحيحة:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/contact-hub
EMAIL_USER=your-gmail-account
EMAIL_PASS=your-gmail-app-password
PORT=5000
NODE_ENV=development
```

يجب استخدام Gmail App Password، لا كلمة مرور الحساب العادية. هذه القيم تبقى في الباك إند فقط ولا توضع في متغيرات `NEXT_PUBLIC_` ولا تُرفع إلى GitHub.

بعد ضبط البيئة:

```bash
npm run seed
npm run dev
```

عملية seed تعمل بـupsert على المفاتيح ولا تحذف باقي المواقع. حُفظ بريد الاستقبال الأصلي المسجّل لموقع `3mo` في الباك إند (`mooh246samy@gmail.com`) دون تغييره. إن أردت تغييره لاحقًا، عدّل `receiverEmail` في `src/sites.seed.js` ثم أعد seed. رابط البريد المباشر في جانب صفحة التواصل منفصل عن الفورم ويستخدم البريد القديم الموجود في واجهة الموقع.

## تشغيل الفرونت

```bash
cd threemo
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

إعدادات الربط في `.env.local`:

```dotenv
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CONTACT_SITE_KEY=3mo
NEXT_PUBLIC_SITE_URL=
```

افتح الموقع على `http://localhost:3000`. أصل `http://127.0.0.1:3000` مسموح أيضًا في seed. رابط GitHub هو مستودع الكود وليس عنوان API؛ لا تستخدمه كقيمة `NEXT_PUBLIC_CONTACT_API_URL`.

الفرونت والباك يعملان منفصلين محليًا؛ لا يحتاج الموقع تفعيل قاعدة بيانات Manus أو تغيير التصدير الثابت. لو تشغّل الموقع من هاتف على نفس الشبكة، `localhost` يشير إلى الهاتف نفسه: استخدم عنوان الشبكة لجهازك بدل localhost، وأضف أصل الفرونت الصريح في إعداد الباك إند. لا تستخدم CORS wildcard.

## معاينة Manus مقابل localhost

نسخة Manus عبر HTTPS لا تستطيع الوصول إلى MongoDB أو سيرفر يعمل على جهازك لمجرد ضبط `localhost`. للاختبار الحالي شغّل المشروعين على جهازك كما سبق، أو استخدم عنوان HTTPS قابلًا للوصول للباك إند مع السماح بأصل الفرونت. لا تعتمد على عنوان preview المؤقت في الإنتاج.

`EXTRA_ORIGINS` في الباك إند اختياري للاختبار. إن استخدمته، اكتب جميع الأصول الإضافية المطلوبة مفصولة بفواصل. القيمة المخصصة تستبدل افتراضيات dev، لكن origins المسجلة للموقع تظل مسموحة. احذف الأصول المؤقتة عند الإطلاق.

## بعد الاستضافة

غيّر فقط إعدادات الفرونت ثم أعد البناء:

```dotenv
NEXT_PUBLIC_CONTACT_API_URL=https://YOUR_BACKEND_DOMAIN/api
NEXT_PUBLIC_CONTACT_SITE_KEY=3mo
NEXT_PUBLIC_SITE_URL=https://YOUR_FRONTEND_DOMAIN
```

```bash
pnpm build
```

قيم `NEXT_PUBLIC_` مضمّنة في نسخة الموقع أثناء البناء؛ تغيير ملف البيئة وحده بعد رفع `out/` لا يغير النسخة المنشورة. في الباك إند غيّر `MONGODB_URI` وSMTP حسب الاستضافة، وأضف الدومين الحقيقي للفرونت إلى `allowedOrigins` الخاصة بـ`3mo` ثم أعد seed. استخدم HTTPS للفرونت والباك؛ API عبر HTTP من صفحة HTTPS قد يُرفض بسبب mixed content. راجع إعداد `trust proxy` بحسب طريقة نشر الباك إند حتى يكون rate limit مبنيًا على IP الصحيح.

## حالات الفورم

زر الإرسال يُعطّل أثناء الطلب، وتظهر رسالة نجاح فقط بعد قبول API للرسالة. خطأ validation يظهر بجوار الحقل، و403 يوضّح مشكلة origin، و404 يوضّح مشكلة siteKey/URL، و429 يطلب الانتظار. أخطاء الشبكة أو timeout لا تمسح محتوى الفورم، ولا تحدث محاولات إرسال تلقائية قد تكرر الرسالة.

النجاح يعني أن الباك إند استقبل الرسالة؛ الكود الأصلي يحفظ في Mongo أولًا ثم يرسل البريد. لو فشل SMTP، يبقى الرد 201 ويُسجّل `emailStatus: failed` و`emailError`. لذلك رسالة الفرونت لا تدّعي أن البريد وصل فعلًا.
