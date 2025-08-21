import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FaqAccordion() {
  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Frequently asked questions
      </Typography>

      <Box>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">
              Can I use Landwind in open-source projects?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Landwind is an open-source library of interactive components built
              on top of Tailwind CSS including buttons, dropdowns, modals,
              navbars, and more.
              <br />
              <br />
              Check out this guide to learn how to{" "}
              <span style={{ color: "blueviolet", cursor: "pointer" }}>
                get started
              </span>{" "}
              and start developing websites even faster with components on top
              of Tailwind CSS.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">
              Is there a Figma file available?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, a Figma file is available with all components. You can
              download it from our official documentation page.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">
              What are the differences between Landwind and Tailwind UI?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Landwind is free and open-source. Tailwind UI is a paid collection
              of professionally designed components by the creators of Tailwind
              CSS.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">
              What about browser support?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              All modern browsers are supported. This includes Chrome, Firefox,
              Safari, Edge, and mobile browsers.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
