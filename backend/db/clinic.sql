-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema clinica
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clinica
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clinic` DEFAULT CHARACTER SET utf8 ;
USE `clinic` ;

-- -----------------------------------------------------
-- Table `clinica`.`especialidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinic`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinic`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dni` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(120) NOT NULL,
  `is_admin` TINYINT NOT NULL DEFAULT 0,
  `is_doctor` TINYINT NOT NULL DEFAULT 0,
  `mail` VARCHAR(80) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `date_birth` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica`.`estudio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinic`.`medical_record` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATE NOT NULL,
  `updated_at` DATE NULL,
  `report` VARCHAR(200) NULL,
  `department_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_medical_record_department_idx` (`department_id` ASC) VISIBLE,
  INDEX `fk_department_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_medical_record_department`
    FOREIGN KEY (`department_id`)
    REFERENCES `clinic`.`department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medical_record_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `clinic`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica`.`turno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinic`.`appointment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 0,
  `medical_record_id` INT NOT NULL,
  PRIMARY KEY (`id`, `medical_record_id`),
  INDEX `fk_appointment_medical_record1_idx` (`medical_record_id` ASC) VISIBLE,
  CONSTRAINT `fk_appointment_medical_record1`
    FOREIGN KEY (`medical_record_id`)
    REFERENCES `clinic`.`medical_record` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica`.`insumo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinic`.`supply` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
