use anchor_lang::prelude::*;

declare_id!("86CHuwRate63ooTL7bdaRt9ZhpiygbPt7sbrn3rFoXts");

#[program]
pub mod my_solana_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_profile(ctx: Context<CreateProfile>, name: String, bio: String) -> Result<()> {
        require!(name.as_bytes().len() <= 32, ProfileError::NameTooLong);
        require!(bio.as_bytes().len() <= 200, ProfileError::BioTooLong);

        let profile = &mut ctx.accounts.profile;
        profile.authority = ctx.accounts.authority.key();
        profile.name = name;
        profile.bio = bio;
        profile.bump = ctx.bumps.profile;
        msg!("Profile created for: {:?}", profile.authority);
        Ok(())
    }

    pub fn update_profile(ctx: Context<UpdateProfile>, new_bio: String) -> Result<()> {
        require!(new_bio.as_bytes().len() <= 200, ProfileError::BioTooLong);
        let profile = &mut ctx.accounts.profile;
        profile.bio = new_bio;
        msg!("Profile updated for: {:?}", profile.authority);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
pub struct UserProfile {
    pub authority: Pubkey,
    pub name: String,
    pub bio: String,
    pub bump: u8,
}

#[derive(Accounts)]
#[instruction(name: String, bio: String)]
pub struct CreateProfile<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + (4 + 32) + (4 + 200) + 1,
        seeds = [b"user-profile", authority.key().as_ref()],
        bump
    )]
    pub profile: Account<'info, UserProfile>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(
        mut,
        seeds = [b"user-profile", authority.key().as_ref()],
        bump = profile.bump,
        has_one = authority
    )]
    pub profile: Account<'info, UserProfile>,
    pub authority: Signer<'info>,
}

#[error_code]
pub enum ProfileError {
    #[msg("Имя не должно превышать 32 символа")]
    NameTooLong,
    #[msg("Биография не должна превышать 200 символов")]
    BioTooLong,
}
