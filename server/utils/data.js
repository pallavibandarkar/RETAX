import mongoose from "mongoose";

const dbUrl = "mongourl to be add";
console.log(dbUrl);

main()
  .then(() => {
    console.log("Connected to Atlas db successfully!!!");
    seedData();
  })
  .catch((err) => {
    console.log(err);
    console.log("oops!Something went wrong!!!");
  });

async function main() {
  await mongoose.connect(dbUrl);
}

async function seedData() {
  try {
    //1. Organization
    const org = await Organization.create({ name: "Acme Corp" });

    // 2. Create Admin User
    const admin = await User.create({
      name: "Alice Admin",
      email: "admin@acme.com",
      password: "hashedpassword",
      role: "admin",
    });

    // upadate organiztion schema
    org.admins.push(admin._id);
    await org.save();

    // 4. Create a TeamSpace
    const team = await TeamSpace.create({
      name: "Sales Team",
      createdBy: admin._id,
      organizationId: org._id,
    });

    admin.teamSpaceId = team._id;
    await admin.save();

    team.users.push(admin._id);
    await team.save();

    // 7. Add team to organization
    org.teamSpaces.push(team._id);
    await org.save();

    // 8. Create another user (sales role)
    const salesUser = await User.create({
      name: "Bob Sales",
      email: "sales@acme.com",
      password: "hashedpassword",
      role: "sales",
      teamSpaceId: team._id,
    });

    team.users.push(salesUser._id);
    await team.save();

    console.log("Dummy data inserted!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}
