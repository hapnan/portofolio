import { Avatar, Fade, Grid, Hidden, Tooltip, Typography, useMediaQuery, useTheme, Zoom } from "@mui/material";
import { makeStyles} from "@mui/styles";
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import ReactTyped from "react-typed";
import clsx from "clsx";
import Image from 'next/image'
import data from '../data.json'
import Cancel from "@mui/icons-material/Cancel";
const { landing } = data

const professionalDetails = landing.professionalDetails.map(({ alt, icon, link }) => {
    const ic = dynamic(async () => await import('simple-icons/icons').then(mod[icon]), {suspense: true, })  || {
        hex: '424242',
        component: <Cancel color="white" fontSize={36} />
    }

    return {
        alt,
        backgroundColor: '#' + ic.hex,
        icon: ic.component || <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>{icon}</title>
            <path d={ic.path} fill="white" />
        </svg>,
        link
    }
})

let iobj = {}
professionalDetails.forEach(({ alt, backgroundColor }) => {
    iobj[alt] = { backgroundColor }
})

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)})`,
        paddingBottom: theme.spacing(10)
    },
    subtitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    avatar: {
        height: theme.spacing(8),
        width: theme.spacing(8),
        padding: theme.spacing(2)
    },
    ...iobj
}))

export default function Landing() {

    const classes = useStyles();
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container justify="center" alignItems="center" className={classes.cont}>
            <Grid item xs={12} lg={6}>
                <Typography variant={mdDown ? "h2" : "h1"}>
                    {landing.title}
                </Typography>
                <Typography variant={mdDown ? "h5" : "h4"} component="h2" className={classes.subtitle}>

                    <ReactTyped
                        strings={landing.subtitles}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    />
                </Typography>
                <Grid container direction="row" spacing={2}>
                    {
                        professionalDetails.map(({ alt, icon, link }, i) =>
                            <Grid item key={i}>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    <Zoom in={true} style={{ transitionDelay: `${100 * i}ms` }}>
                                        <Tooltip title={alt} placement="top">
                                            <Avatar variant="rounded" className={clsx([classes.avatar, classes[alt]])}>
                                                {icon}
                                            </Avatar>
                                        </Tooltip>
                                    </Zoom>
                                </a>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>

            <Hidden mdDown>
                <Fade in={true} style={{ transitionDelay: '100ms' }}>
                    <Grid item lg={6}>
                        <Image
                            src="/landing.svg"
                            priority="true"
                            alt="Landing"
                            width= {900.94}
                            height= {787}
                        />
                    </Grid>
                </Fade>
            </Hidden>
        </Grid>
    )
}