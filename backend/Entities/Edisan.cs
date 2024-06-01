using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities;

public partial class EdisanContext : DbContext
{
    public EdisanContext()
    {
    }

    public EdisanContext(DbContextOptions<EdisanContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ClientInfo> ClientInfos { get; set; }

    public virtual DbSet<Loan> Loans { get; set; }

    public virtual DbSet<LoanPay> LoanPays { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<UserType> UserTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=Edisan;TrustServerCertificate=true;Trusted_Connection=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ClientInfo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ClientIn__3213E83F23E48AD4");

            entity.ToTable("ClientInfo");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Birthdate).HasColumnType("date");
            entity.Property(e => e.CivilStatus)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Civil_Status");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MiddleName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NameOfFather)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NameOfMother)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Occupation)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Religion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserType).HasColumnName("userType");
        });

        modelBuilder.Entity<Loan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Loan__3214EC0718EA4844");

            entity.ToTable("Loan");

            entity.Property(e => e.DueDate).HasColumnType("date");
            entity.Property(e => e.NextPayment).HasColumnType("date");
            entity.Property(e => e.Payment)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<LoanPay>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__loanPay__3214EC07F58B969C");

            entity.ToTable("loanPay");

            entity.Property(e => e.LoanTime).HasColumnType("datetime");
            entity.Property(e => e.Schedule).HasColumnType("date");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("status");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__85C600AF3FA14950");

            entity.ToTable("Transaction");

            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.ScheduleId).HasColumnName("schedule_id");
            entity.Property(e => e.TransactionDate)
                .HasColumnType("date")
                .HasColumnName("transaction_date");
        });

        modelBuilder.Entity<UserType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserType__3213E83FBEC58318");

            entity.ToTable("UserType");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
