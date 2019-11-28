import { Form } from "semantic-ui-react";
import { useState, useEffect } from "react";
import SystemRequestor from '../../services/resources/system';


const SystemSelect = ({ placeholder, name, label, error, errorMessage, value, onChange }, props) => {

  const [system, setSystem] = useState({ load: false, system: null });

  const formatInDropdawnArray = (system) => {
    return system.map(e => ({ key: e.name, value: e.name, text: e.name }));
  }

  useEffect(() => {
    SystemRequestor.listAllSystems().then(data => setSystem({ load: true, system: data }));
  }, []);

  return (
    <Form.Select
      loading={!system.load}
      fluid
      placeholder={placeholder}
      options={system.load ? formatInDropdawnArray(system.system.data) : []}
      name={name}
      label={label}
      error={error ? errorMessage ? { content: errorMessage } : null : null}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

export default SystemSelect;