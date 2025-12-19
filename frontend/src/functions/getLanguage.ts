import 'dayjs/locale/de';
import 'dayjs/locale/en';

export const getLang= ():string=>{
    const lang = navigator.language.startsWith('en') ? 'en' : 'de'; // liest browser aus und speichert de oder en
    return lang; //gibt en oder de zurück
}