import { Button, List, Input } from 'antd';

import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

const { TextArea } = Input;


const App = () => {
  const [mesdata, setmesdata] = useState([]) // 불러올 메세지

  const [inputs, setInputs] = useState({
    title: "",
    content: ""
  }); // 메세지 입력

  const { title, content } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  };

  const getmes = async () => {
    try {
      let response = await fetch(`https://prod.spfunc.ml/api/spboard/readAll`, {
        method: 'GET',
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

      let initdata = [];

      for (var i = 0; i < resJSON.length; i++) {
        initdata.push(resJSON[i].title + " : " + resJSON[i].content)
      }

      setmesdata(initdata)

    } catch (e) {

    }
  } // 메세지 불러오기 

  const uploadmes = async () => {
    try {
      let response = await fetch(`https://prod.spfunc.ml/api/spboard/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(inputs)
      })
      if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error("" + response.status);
      window.location.reload(); // 새로고침하여 페이지 갱신
    } catch (e) {
    }
  } // 메세지 업로드 

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
      <Input showCount maxLength={30} onChange={onChange} style={{ marginBottom: '30px' }} placeholder="제목" name="title" value={title} />
      <TextArea showCount maxLength={300} onChange={onChange} style={{ marginBottom: '30px' }} placeholder="내용" name="content" value={content} />
      <Button onClick={uploadmes}> 메세지 추가 </Button>
    </div>
  );
}

export default App;
