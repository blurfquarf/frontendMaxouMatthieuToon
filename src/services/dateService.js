const currentDate = new Date(2022, 4, 2);



///////////////////////////////////1111111111/////////////////////////////////////////////
//januari is hier nulde maand!


//STUDENT
//addsubjects

//PROMOTOR
//indienen als promotor

//BEDRIJF
//indienen, overzicht
const indienenPromotorStart = new Date(2022, 1, 8);
const indienenPromotorEind = new Date(2022, 2, 30);

///////////////////////////////////2222222222/////////////////////////////////////////////

//goedkeuren
const goedkeurenStart = indienenPromotorStart;
const goedkeurenEind = new Date(2022, 2, 31);


///////////////////////////////////3333333333/////////////////////////////////////////////



//STUDENT
//keuzeStudent, addsubj weg + submit choices erbij
const keuzeStudentStart = new Date(2022, 3, 1);
const keuzeStudentEind = new Date(2022, 3, 30);



///////////////////////////////////4444444444/////////////////////////////////////////////



//STUDENT
//boost, submit choices terug weg
const boostStart = new Date(2022, 4, 1);
const boostEind = new Date(2022, 4, 15);



///////////////////////////////////5555555555/////////////////////////////////////////////


//finaletoewijzing
const toewijzingStart = new Date(2022, 4, 16);
const toewijzingEind = new Date(2022, 4, 20);



class DateService{
    getIndienfase() {
        return (currentDate >= indienenPromotorStart) && (currentDate <= indienenPromotorEind);
    }

    getGoedkeurfase(){
        return (currentDate >= goedkeurenStart) && (currentDate <= goedkeurenEind);
    }

    getKeuzefase(){
        return (currentDate >= keuzeStudentStart) && (currentDate <= keuzeStudentEind);
    }

    getBoostFase(){
        return (currentDate >= boostStart) && (currentDate <= boostEind);

    }

    getToewijzingFase(){
        return (currentDate >= toewijzingStart) && (currentDate <= toewijzingEind);
    }

    getGeenFase(){
        return !this.getIndienfase() && !this.getGoedkeurfase() && !this.getKeuzefase() && !this.getBoostFase() && !this.getToewijzingFase()
    }
}

export default new DateService();