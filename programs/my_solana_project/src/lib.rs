use anchor_lang::prelude::*;

declare_id!("6QT6SNbSJ4M2p1HG4ZZ9Bu1gifyQpCt4QLf8kWTfFWJJ");

#[program]
pub mod my_solana_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
