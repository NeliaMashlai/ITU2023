import React, {useEffect, useRef } from "react";
import ItemPageStyle from "./ItemPage.module.css";
import { fixElementHeight, checkLogin, Contacts, Header, GetItem } from "../Utils";
import "../GlobalStyles.css";

const ItemPage = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);

    const loremIpsum = `


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacus lorem, ultricies quis pharetra et, molestie id odio. Fusce egestas lorem erat, a viverra nibh sagittis vitae. Vestibulum tempus vehicula quam a pulvinar. Nunc ultricies iaculis sapien id dictum. Aliquam at malesuada orci, in ultricies turpis. Curabitur consequat, erat at posuere finibus, dolor nisl eleifend ipsum, ut sollicitudin diam nibh non leo. Integer sed nibh quis enim convallis pulvinar eu tempor nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Aliquam id erat congue, blandit augue malesuada, eleifend magna. Duis pharetra dapibus urna, ac malesuada mi. Duis dui odio, ultrices consequat tortor vitae, pulvinar fringilla nisl. Aenean bibendum mollis euismod. Suspendisse rhoncus congue euismod. In viverra varius nulla. Proin sit amet tellus ornare, luctus tellus ut, bibendum nibh. Aenean et eleifend nisi. Curabitur a sagittis tortor. Donec bibendum convallis est, nec pharetra risus semper id. Ut lacinia interdum egestas. Nam quis nibh ultricies leo suscipit mattis. Vivamus vitae felis nisi.

Aenean fringilla nisl orci, eget ullamcorper sem sodales in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas vitae maximus felis. Nam vel consequat nisl. Duis sit amet condimentum nulla. Duis semper blandit justo, vel rhoncus tellus ullamcorper vel. In ipsum quam, rhoncus ornare vehicula in, fermentum nec libero. Curabitur eget leo tincidunt, faucibus justo quis, porttitor orci.

Quisque imperdiet tincidunt risus, ullamcorper auctor metus vulputate at. Cras tincidunt sit amet lorem at mattis. Ut ac suscipit metus, et feugiat dolor. Quisque eu dui ac ipsum semper vehicula vel sed magna. Sed rhoncus varius tellus, sit amet tincidunt dolor elementum sit amet. Cras semper ex lacus, et dignissim lectus feugiat ut. Sed ac ullamcorper nunc.

Nam congue pulvinar sapien, in fermentum risus malesuada sit amet. Aenean ligula libero, bibendum eu enim sit amet, sodales accumsan felis. Curabitur eget blandit enim. Donec quis leo sed nisi convallis vehicula. Vestibulum elementum, magna eleifend vestibulum lobortis, nisl ipsum rhoncus mi, ut pulvinar urna neque eget enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ornare dolor dui, at pellentesque dui lacinia sed. Phasellus nec tortor vitae tortor porttitor iaculis sit amet eget mauris. Vivamus a sem sollicitudin, sollicitudin velit nec, ultricies magna. Duis euismod felis et tortor varius, vel efficitur mi molestie.

Vivamus ullamcorper urna a magna commodo feugiat. Sed tincidunt, orci eget pellentesque sodales, diam odio blandit lectus, quis rutrum lectus ex id magna. Aliquam consectetur ac odio et fringilla. Pellentesque sit amet porta enim. Morbi ut maximus neque, ut tincidunt ex. Praesent lacinia ante quis nunc tempus, consectetur hendrerit mauris sodales. Proin rhoncus tincidunt pharetra. Cras consequat justo lacinia, sodales ex sed, consectetur nulla. Aenean et suscipit velit. Aenean mollis justo justo, nec faucibus elit condimentum eu. Praesent tincidunt velit id vestibulum consectetur. Suspendisse sagittis a nibh vel vulputate. Vestibulum lobortis sed neque vel imperdiet. Morbi lacinia finibus magna a rutrum.

Duis facilisis elit eget velit vehicula blandit. Mauris consectetur nisl at leo congue dapibus. Vivamus tincidunt eros sapien, non varius risus pretium sed. Vivamus magna risus, pellentesque ac diam sit amet, hendrerit vehicula velit. Duis ut velit ut felis condimentum interdum a at massa. Mauris non est ipsum. Suspendisse potenti. Aliquam non odio at libero porttitor aliquet nec id lectus. Nunc in dui et nisi sollicitudin finibus vel id mauris. Duis non orci nisi. Vivamus at tempus sapien, sed consequat nunc. Etiam porttitor, ligula at tempus feugiat, nunc nisi vestibulum elit, id consectetur lorem nunc non turpis. Morbi vitae cursus justo. Ut diam enim, varius sed ante et, mattis convallis nisl. Etiam porta varius orci sit amet laoreet.

Nulla id augue vitae nisi ullamcorper fermentum. Sed scelerisque porttitor quam, nec maximus mi porta at. Nulla sodales, neque nec cursus posuere, leo libero tristique libero, vel tempor ante urna eu purus. Phasellus consectetur molestie mauris ut posuere. Aliquam sollicitudin, magna scelerisque tempus rhoncus, ligula sapien aliquam sapien, quis lacinia odio justo quis ex. Nullam eget magna blandit tortor tincidunt auctor. Fusce molestie magna sed orci dapibus, at tristique ligula tristique. Aliquam erat volutpat. Aliquam non hendrerit tortor. Aliquam tincidunt non tellus vitae efficitur. Ut condimentum eros nec maximus imperdiet.

Mauris feugiat lacus lectus, vitae gravida velit pellentesque quis. Duis non enim sit amet sapien ornare bibendum nec ut enim. Sed scelerisque nec sem quis eleifend. Mauris lobortis mauris est, at bibendum velit tristique sagittis. Maecenas in tellus turpis. Cras semper et purus ac faucibus. Nulla erat leo, rhoncus at tellus nec, venenatis sollicitudin quam. Praesent a commodo eros. Vivamus efficitur elementum mi non fermentum. Suspendisse gravida commodo nisl. Proin maximus sollicitudin ultricies. Nulla pretium nibh quis velit feugiat fringilla. Cras ut congue ante, a porttitor neque.

Aenean nec elit eu libero consequat sodales. Sed leo dolor, fringilla nec feugiat nec, molestie et ligula. Maecenas quis erat nec elit ultrices finibus. Suspendisse mollis tristique mollis. Nam ornare eu ipsum ut semper. Vivamus malesuada nisl neque, nec efficitur dolor faucibus quis. Sed egestas, purus id congue euismod, orci dui elementum lacus, sit amet blandit mi velit a diam. Nunc id augue sit amet magna varius iaculis. Etiam vitae velit ut justo eleifend mattis et et lorem. In feugiat quam orci, a rhoncus elit facilisis a. Aenean id nulla ex. Donec accumsan felis aliquam ultricies gravida. 
    `
    
    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }

        GetItem("2").then((item) => {
            console.log(item);
        });
    
        checkLogin(loggedIn, logInRef);
    }, []);

    return (
        <div>

            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={ItemPageStyle["main-container"]} >
                <div  className={ItemPageStyle['image-container']} >
                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHWHnF9NAaDN9_VCxR4y2M2H3aPqMV_Vr-5w&usqp=CAU" alt="Preview" className={ItemPageStyle["image-preview"]}/> */}
                </div>

                <div className={ItemPageStyle["item-price"]}>Price: €139.99</div>

                <div className={ItemPageStyle["item-name"]}>
                    Name:<br />
                    Name of the item
                </div>

                {/* <div className={ItemPageStyle["item-description"]}>
                    Description:<br />
                    {loremIpsum}
                </div> */}

                <div className={ItemPageStyle["item-size"]}>
                    Size: <br />
                    M
                </div>

                <div className={ItemPageStyle["item-condition"]}>Condition: New</div>

            </div>

            <Contacts />

        </div>
    );
}

export default ItemPage;