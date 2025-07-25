import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const calculateAge = (dob)=> {
       const today = new Date()
       const birtDate = new Date(dob)

       let age = today.getFullYear() - birtDate.getFullYear()
       return age
    }
    const slotDateFormat = (slotDate) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (!slotDate) return 'Invalid Date';
        const dateArray = slotDate.split('_');
        if (dateArray.length !== 3) return 'Invalid Date';
    
        const day = dateArray[0];
        const monthIndex = Number(dateArray[1]) - 1;
        const year = dateArray[2];
    
        if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return 'Invalid Date';
    
        return `${day} ${months[monthIndex]} ${year}`;
      };

    const value={
        calculateAge,
        slotDateFormat
    }

    return (
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider