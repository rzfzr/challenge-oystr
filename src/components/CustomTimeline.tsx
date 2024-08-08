import * as React from 'react'
import Typography from '@mui/material/Typography'
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from '@mui/lab'

export default function CustomTimeline({ comics }: { comics: Comic[] }) {
    return (
        <Timeline position="alternate">
            {comics.map((comic, index) => (
                <TimelineItem
                    key={index}>
                    <TimelineOppositeContent
                        sx={{ m: 'auto 0' }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                    >
                        <img
                            height={260}
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt={comic.series.resourceURI}
                            loading="lazy"
                        />
                        {/* {new Date(comic.dates[0].date).getFullYear().toString()} */}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot>
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent
                        sx={{ m: 'auto 0' }}
                    >
                        <Typography variant="h6" component="span">
                            {comic.title}
                        </Typography>
                        <Typography>{comic.series.name}</Typography>
                    </TimelineContent>
                </TimelineItem>
            ))
            }
        </Timeline>
    )
}
