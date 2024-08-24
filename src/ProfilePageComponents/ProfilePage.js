import React, {useState, useEffect} from 'react';
import '../Universal/index.css'
import axios from 'axios';
import Profile from '../MainPageComponents/Profile'
import {Buffer} from 'buffer'
import authService from '../views/auth-service';

export default function ProfilePage(){
    function Page(){
        return(
            <div className='col-9 d-flex'>
                <div className='col-1'>
                    &nbsp;
                </div>
                <div className='col-10' style={{height: "80vh", border: "1px solid red"}}>
                    
                </div>
                <div className='col-1'>
                    &nbsp;
                </div>

            </div>
        )
    }

    return(
        <div className='d-flex'>
            <Page></Page>
            <div className="col-3 pe-0 g-0">
                <Profile></Profile>
            </div>
        </div>
    )
}