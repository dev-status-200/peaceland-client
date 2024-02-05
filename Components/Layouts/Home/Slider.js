import React, { useState } from 'react';
import axios from 'axios';
import { DatePicker, ConfigProvider, Select } from "antd";
import Router from 'next/router';

const Slider = () => {

    const [options, setOptions] = useState([])
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        // e.length>0?
        if(options.length==0){
            axios.get(process.env.NEXT_PUBLIC_GET_TOUR_SEARCH,{
                headers:{'search':search}
            }).then((x)=>{
                setOptions(x.data.result);
            })//:null
        }
    }
    const handleChange = (e) => {
        setSearch(e)
    }

  return (
    <div className='home-slider-styles'>
        <div>
            <video autoPlay loop muted style={{width:'100vw'}}>
                <source src="/video/video.mp4"  />
            </video>
        </div>
    <div style={{position:'absolute', top:"30%", width:'100%', textAlign:'center'}}>
        <h3 style={{fontFamily:'monospace'}} className='heading-main mt-5 pt-5'>PEACELAND<span className='mx-3'></span>TRAVEL & TOURISM</h3>
        <div className='mt-5' >
            <div className='search-container'>
                <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:0 }}}>
                    <Select
                        showSearch
                        style={{width:500, height:55, textAlign:'left'}}
                        value={search}
                        placeholder={"Search Tours"}
                        onSearch={handleSearch}
                        onChange={handleChange}
                        dropdownStyle={{
                            maxHeight:100
                        }}
                        placement={"bottomRight"}
                        options={options?.map((x)=>{
                            return{ label:x.title, value:x.slug }
                        })}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                        ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </ConfigProvider>
                <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:0 }}}>
                    <DatePicker style={{ height:55, textAlign:'left'}} />
                </ConfigProvider>
                <button className='search-btn' onClick={()=>search?Router.push(`/product/${search}`):null}>{"Go"}</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default React.memo(Slider)