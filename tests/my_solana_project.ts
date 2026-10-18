import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MySolanaProject } from "../target/types/my_solana_project";
import { expect } from "chai";

describe("my_solana_project - Week 6 PDA Profile", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.MySolanaProject as Program<MySolanaProject>;

  const [profilePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("user-profile"), provider.wallet.publicKey.toBuffer()],
    program.programId
  );

  it("Создает профиль пользователя через PDA", async () => {
    const tx = await program.methods
      .createProfile("Diana", "Information Systems student, Solana Developer")
      .accounts({
        profile: profilePda,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Create profile transaction signature:", tx);

    const profileAccount = await program.account.userProfile.fetch(profilePda);
    expect(profileAccount.name).to.equal("Diana");
    expect(profileAccount.bio).to.equal("Information Systems student, Solana Developer");
    expect(profileAccount.authority.toBase58()).to.equal(provider.wallet.publicKey.toBase58());
  });

  it("Обновляет био профиля через PDA", async () => {
    const updatedBio = "Anchor PDA Profile completed";
    const tx = await program.methods
      .updateProfile(updatedBio)
      .accounts({
        profile: profilePda,
        authority: provider.wallet.publicKey,
      })
      .rpc();

    console.log("Update profile transaction signature:", tx);

    const profileAccount = await program.account.userProfile.fetch(profilePda);
    expect(profileAccount.bio).to.equal(updatedBio);
  });
});
