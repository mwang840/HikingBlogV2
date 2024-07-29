"use client";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NPSKey } from "../parksKey";
import axios from "axios";
export default function SearchBar() {
    const apiUrl = 'https://developer.nps.gov/api/v1/parks';
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchList, setSearchList] = useState<string[]>([]);
    const [parkData, setParkData] = useState<string>("");
    const filteredSearch = searchList.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

      const getParksData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            params: {
              q: searchQuery,
              api_key: NPSKey, // assuming NPSAPI_Key is your API key
            },
          });
          setParkData(response.data.data);
          console.log(response.data.data)
        } catch (error) {
          console.error(error);
        }
      };

    const getParks = ()=>{
      getParksData();
    }
    console.log(searchQuery);

    return (
        <div style={{ position: 'relative', width: '300px' }}>
            <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search for a park" 
                style={{ width: '100%', padding: '10px', paddingLeft: '36px' }}
            />
            <FontAwesomeIcon 
                icon={faSearch} 
                style={{ 
                    position: 'absolute', 
                    left: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    fontSize: '16px', 
                    color: '#888' 
                }} 
                
            />
            <ul>
              
            </ul>
            <div>
                {filteredSearch.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
}
