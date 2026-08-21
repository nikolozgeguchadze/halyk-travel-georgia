// In-memory demo store — stands in for the real cross-border client/travel-status
// service described in the PRD (section 9, "защищённые внутригрупповые каналы").
const clients = new Map();

function getStatus(clientId) {
  return (
    clients.get(clientId) ?? {
      clientId,
      active: false,
      consent: false,
      activatedAt: null,
      fraudMonitoringFlag: false,
    }
  );
}

function activate(clientId, consent) {
  const record = {
    clientId,
    active: true,
    consent,
    activatedAt: new Date().toISOString(),
    fraudMonitoringFlag: true,
  };
  clients.set(clientId, record);
  return record;
}

function deactivate(clientId) {
  const record = {
    clientId,
    active: false,
    consent: getStatus(clientId).consent,
    activatedAt: null,
    fraudMonitoringFlag: false,
  };
  clients.set(clientId, record);
  return record;
}

export default { getStatus, activate, deactivate };
