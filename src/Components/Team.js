import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

// Example team members
const teamMembers = [
  {
    name: "Alice Kumar",
    role: "CEO & Co-Founder",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Singh",
    role: "CTO & Co-Founder",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Priya Patel",
    role: "Lead Designer",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    name: "Ankit Sharma",
    role: "Senior Engineer",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
  },
];

export default function Team() {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Meet Our Team
      </Typography>
      <Grid container spacing={4}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.name}>
            <Card elevation={2} sx={{ textAlign: "center", py: 3 }}>
              <Avatar
                src={member.avatar}
                alt={member.name}
                sx={{ width: 80, height: 80, margin: "0 auto 16px auto" }}
              />
              <CardContent>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
