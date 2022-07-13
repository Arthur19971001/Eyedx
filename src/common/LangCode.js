import React, { useState } from 'react'

export const LangCode = (lang) => {
    var userLang = lang;
    //= navigator.language || navigator.userLang;
  
    if(userLang === "ko-KR" || userLang === "ko"){
        return "kr"   
    } else {
        return "en"
    }
}
  

