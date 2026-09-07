const SPREADSHEET_ID = '1zAdUCRtPPKxWDC8_Oclkne0ysFk0UA87HwALx3SDn5Q';

function doGet() {
  const model = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Финмодель');
  const value = address => model.getRange(address).getValue();
  const number = address => Number(value(address)) || 0;
  const revenue = number('C24');
  const deliveryShare = number('C16');
  const rawMaterials = number('C25');
  const capex = number('C52');
  const depreciation = number('C40');

  const payload = {
    updatedAt: new Date().toISOString(),
    model: {
      start: Utilities.formatDate(value('B4'), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
      months: number('B5'),
      traffic: number('C10'),
      conversion: number('C11') * 100,
      check: number('C12'),
      cogs: number('C13') * 100,
      marketing: number('C14'),
      retail: number('C15') * 100,
      delivery: deliveryShare * 100,
    },
    fixed: {
      commission: revenue && deliveryShare ? number('C32') / (revenue * deliveryShare) : 0,
      payroll: number('C17'),
      rent: number('C18'),
      utilities: number('C19'),
      admin: number('C37'),
      capex: capex,
      life: depreciation ? capex / depreciation : 0,
      tax: revenue ? number('C43') / revenue : 0,
      deferral: rawMaterials ? 30 * (1 - number('C53') / rawMaterials) : 0,
      discount: number('C67'),
      fin: number('C42'),
    },
  };

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
