# Google Sheets sync endpoint

1. Откройте https://script.new под Google-аккаунтом, которому доступна исходная таблица.
2. Вставьте содержимое `Code.gs` и сохраните проект.
3. Выберите `Deploy` → `New deployment` → `Web app`.
4. Установите `Execute as`: `Me`, `Who has access`: `Anyone`.
5. После изменения кода выберите `Deploy` → `Manage deployments` → значок редактирования → `Deploy`, чтобы создать новую версию этого же развёртывания.
6. URL вида `https://script.google.com/macros/s/.../exec` уже встроен в HTML. Открывать или вводить его в модели не требуется.

Endpoint читает рассчитанные значения с листа `Финмодель`, а HTML пересчитывает P&L, ДДС, NPV, IRR и сценарии локально. Для обхода ограничений браузера на межсайтовые запросы используется JSONP, предусмотренный Google Apps Script Content Service.
