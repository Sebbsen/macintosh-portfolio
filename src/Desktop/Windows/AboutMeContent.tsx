import { useEffect, useState } from "react";
import profil from '@/images/sebastian-gremm-profil.png';
import helpIcon from '@/icons/help-icon.svg';
import systemIcon from '@/icons/system-icon.svg';
import './AboutMeContent.scss'



export const AboutMeContent = () => {

    const [varName, setVarName] = useState('defaultValue');
    
    
    useEffect(() => {
        //do smth when prop changed
    }, [])


    return (
        <div className="about-me-content">
            <div className="about-me-content__top">
                <div className="headline headline--h3"><img src={profil} alt="Sebastian Gremm Profil" /> <span>Sebastian Gremm</span></div>
                <div>
                    <h3 className="headline headline--h3">Frontend since 2019</h3>
                    <span>© Gremm, Inc. 1997 - undefined</span>
                </div>
                <div className="about-me-content__left-right">
                    <h3 className="headline headline--h3">Total Memory:</h3>
                    <span>4,096K</span>
                </div>
                <div className="about-me-content__left-right">
                    <h3 className="headline headline--h3">Largest Unused Block:</h3>
                    <span>1,0972K</span>
                </div>
            </div>
            <hr className="about-me-content__divider" />
            <div>
                <h3 className="headline headline--h3">Few Things I Do:</h3>
                <ul className="about-me-content__list">
                    <li><img src={helpIcon} alt="" /> HTML</li>
                    <li><img src={systemIcon} alt="" /> CSS</li>
                    <li><img src={systemIcon} alt="" /> SASS</li>
                    <li><img src={systemIcon} alt="" /> TAILWIND</li>
                    <li><img src={helpIcon} alt="" /> JS</li>
                    <li><img src={helpIcon} alt="" /> VUE</li>
                    <li><img src={systemIcon} alt="" /> WORDPRESS</li>
                    <li><img src={systemIcon} alt="" /> PIMCORE</li>
                </ul>
            </div>
        </div>
    )
}