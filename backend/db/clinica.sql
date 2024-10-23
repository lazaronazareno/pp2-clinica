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
CREATE SCHEMA IF NOT EXISTS `clinica` DEFAULT CHARACTER SET utf8 ;
USE `clinica` ;

-- -----------------------------------------------------
-- Table `clinica`.`especialidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica`.`especialidad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dni` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `is_admin` TINYINT NOT NULL DEFAULT 0,
  `is_empleado` TINYINT NOT NULL DEFAULT 0,
  `mail` VARCHAR(80) NOT NULL,
  `telefono` VARCHAR(45) NULL,
  `fecha_nacimiento` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica`.`estudio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica`.`estudio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `created_at` DATE NOT NULL,
  `updated_at` DATE NULL,
  `informe` VARCHAR(200) NULL,
  `especialidad_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`, `usuario_id`),
  INDEX `fk_estudio_especialidad_idx` (`especialidad_id` ASC) VISIBLE,
  INDEX `fk_estudio_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_estudio_especialidad`
    FOREIGN KEY (`especialidad_id`)
    REFERENCES `clinica`.`especialidad` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_estudio_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `clinica`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica`.`turno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica`.`turno` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 0,
  `estudio_id` INT NOT NULL,
  PRIMARY KEY (`id`, `estudio_id`),
  INDEX `fk_turno_estudio1_idx` (`estudio_id` ASC) VISIBLE,
  CONSTRAINT `fk_turno_estudio1`
    FOREIGN KEY (`estudio_id`)
    REFERENCES `clinica`.`estudio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica`.`insumo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica`.`insumo` (
  `id` INT NOT NULL,
  `nombre` INT NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
