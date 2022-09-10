import { Button, List, Input } from 'antd';

import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

const { TextArea } = Input;

const App = () => {

  const [mesdata, setmesdata] = useState([]) // 불러올 메세지

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  const getmes = async () => {
    try {
      let response = await fetch(`https://prod.spfunc.ml/api/spboard/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
        },
      })
      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
      let resJSON = await response.json();
      if (!response.ok) {
        throw Error(resJSON.message);
      }
      setmesdata(resJSON)
    } catch (e) {

    }
  } // 메세지 불러오기 

  const uploadmes = () => {
    // 메세지 업로드 
  }

  useEffect(() => {
    getmes();
  }, [])

  return (
    <div style={{ marginLeft: '15vw', marginRight: '15vw', marginTop: '50px', height: 'auto' }}>
      <List
        size="small"
        header={<div style={{ textAlign: 'center', fontSize: '20px' }}> 메세지 </div>}
        bordered
        dataSource={mesdata}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ marginBottom: '30px' }}
      />
      <Input showCount maxLength={30} onChange={onChange} style={{ marginBottom: '30px' }} placeholder="제목" id='name' />
      <TextArea showCount maxLength={300} onChange={onChange} style={{ marginBottom: '30px' }} placeholder="내용" id='texts' />
      <Button onClick={uploadmes}> 메세지 추가 </Button>
    </div>
  );
}

export default App;
