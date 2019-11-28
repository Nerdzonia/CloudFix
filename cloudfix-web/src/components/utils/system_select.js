import { Form } from "semantic-ui-react";
import { useState, useEffect } from "react";
import SystemRequestor from '../../../services/resources/system';


const SystemSelect = () => {

  const [system, setSystem] = useState({load: false, system: null});

  const formatInDropdawnArray = (system) => {
    return system.map(e => ({key: e.name, value: e.name, text: e.name}));
  }

  useEffect(() => {
    SystemRequestor.listAllSystems().then(data => setSystem({load: true, system: data}));
  }, []);

    return (
        <Form.Select
            loading={!system.load}
            fluid
            placeholder="Ex: Selecione o sistema"
            options={system.load ? formatInDropdawnArray(system.system.data) : []}
            name='system'
        />
    );
}

export default SystemSelect;