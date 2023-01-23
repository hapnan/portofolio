import { Avatar, Fade, Grid, Hidden, Tooltip, Typography, useMediaQuery, useTheme, Zoom } from "@mui/material";
import { makeStyles } from "@mui/styles";
import dynamic from 'next/dynamic'
import Cancel from "@mui/icons-material/Cancel";
import clsx from "clsx";
import Image from 'next/image'
import { useRef , Suspense, useEffect, useState} from "react";

import data from '../data.json'
import useAnimate from "./useAnimate";
import { iconify } from "./util";
const { skills } = data


    // const wrapper = (sk = []) => sk.map(v => {
    //     const ic = dynamic(() => import('simple-icons/icons').then(icons => icons[v.icon])) || {
    //         title: v,
    //         hex: '424242',
    //         component: <Cancel />
    //     }
    //     return {
    //         alt: v.alt || v || ic.title,
    //         backgroundColor: v.backgroundColor || ('#' + ic.hex),
    //         icon: ic.component || <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" xmlnsXlink="http://www.w3.org/1999/xlink">
    //             <title>{ic.title}</title>
    //             <path d={ic.path} fill="white" />
    //         </svg>,
    //     }
    // })

    function useDynamicSVGImport(name) {
        const ImportedIconRef = [];
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState();
      
        useEffect(() => {
          setLoading(true);
          const importIcon = async () => {
            try {
              ImportedIconRef= async (
                await name.map((sk) => {
                    dynamic(() => import('simple-icons/icons').then(icons => icons[sk.icon]), { ssr: false })
                    const icon = icons[sk.icon]
                    
                    return icon;
                })
              );
            } catch (err) {
              setError(err);
            } finally {
              setLoading(false);
            }
          };
          importIcon();
        }, [name]);
      
        return { error, loading, SvgIcon: ImportedIconRef.current };
      }
      
      /**
       * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
       * or even use the hook directly in your components.
       */
      function Icon() {

          const { error, loading, SvgIcon } = useDynamicSVGImport(skills);

            if (error) {
              return error.message;
            }
            if (loading) {
              return "Loading...";
            }
            if (SvgIcon) {
              return {
    
                    alt: v.alt || v || ic.title,
                    backgroundColor: v.backgroundColor || ('#' + ic.hex),
                    icon: SvgIcon || <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <title>{ic.title}</title>
                        <path d={ic.path} fill="white" />
                    </svg>,
                }
    
            }
            return null;
        
        
      };

// let wrappedSkills = {}
// Object.getOwnPropertyNames(skills).forEach(type => {
//     wrappedSkills[type] = Icon(skills[type])
//     console.log(wrappedSkills)
// })

// let iobj = {}
// Object.values(wrappedSkills).forEach(oarr => {
//     oarr.forEach(({ backgroundColor, alt }) => {
//         iobj[alt] = { backgroundColor }
//     })
// })


const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)})`,
    },
    skobj: {
        marginBottom: theme.spacing(4)
    },
    avatar: {
        height: theme.spacing(7),
        width: theme.spacing(7),
        padding: theme.spacing(1.5)
    },
    ...iobj
}))

export default function Skills() {

    const classes = useStyles()
    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const align = mdDown ? "center" : "flex-end"
    const textAlign = mdDown ? "center" : "right"

    const animref = useRef(null)
    const animate = useAnimate(animref)

    return (
        <Grid container justify="center" alignItems="center" spacing={10} className={classes.cont}>
            <Grid item xs={12} lg={6} ref={animref}>
                <Typography variant="h2" gutterBottom align="center">
                    Skills
                </Typography>
                <Hidden mdDown>
                    <Fade in={animate} style={{ transitionDelay: '100ms' }}>
                        <div>
                            <Image
                                alt="Skills"
                                src="/skill.svg"
                                width="1139"
                                height="655"
                            />
                        </div>
                    </Fade>
                </Hidden>
            </Grid>
            <Grid container item xs={12} lg={6} direction="column" spacing={1} alignItems={align}>
                {
                    Icon.map((title, id) =>
                        <Grid item key={id} className={classes.skobj}>
                            <Typography variant="h4" align={textAlign} gutterBottom component="p">
                                {title}
                            </Typography>
                            <Grid container item direction="row" spacing={1} justify="center">
                                {
                                    Icon.map(({ alt, Icon }, i) =>
                                        <Grid item key={i}>
                                            <Zoom in={animate} style={{ transitionDelay: `${150 * i}ms` }}>
                                                <Tooltip title={alt.replace("_", " ")} placement="top">
                                                    <Avatar variant="rounded" className={clsx([classes.avatar, classes[alt]])}>
                                                        <Icon/>
                                                    </Avatar>
                                                </Tooltip>
                                            </Zoom>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    )
}